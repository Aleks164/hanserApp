import { PipelineStage } from "mongoose";
import { getNextDayDate } from "../../../../utils/getNextDayDate";

export default function getReportDetailByDateRange(fromDate: string, toDate: string): PipelineStage[] {
    return [
        {
            '$match': {
                'sale_dt': {
                    '$gte': new Date(fromDate),
                    '$lte': fromDate === toDate ? getNextDayDate(toDate) : new Date(toDate)
                }
            }
        }, {
            '$group': {
                '_id': '$barcode',
                'quantity': {
                    '$push': '$quantity'
                },
                'retail_price': {
                    '$push': '$retail_price' //Цена розничная
                },
                'sale_percent': {
                    '$push': '$sale_percent' //Согласованная скидка
                },
                'retail_price_withdisc_rub': {
                    '$push': '$retail_price_withdisc_rub' //Цена розничная с учетом согласованной скидки
                },
                'delivery_rub': {
                    '$push': '$delivery_rub' //Стоимость логистики
                },
                'ppvz_for_pay': {
                    '$push': '$ppvz_for_pay' //К перечислению продавцу за реализованный товар
                },
                'subject_name': {
                    '$first': '$subject_name' //Предмет
                },
                'sa_name': {
                    '$first': '$sa_name' //Артикул продавца
                },
                'ts_name': {
                    '$first': '$ts_name' //Размер
                },
                'nm_id':{
                    '$first': '$nm_id' // Артикул WB
                }
            }
        }, {
            '$sort': {
                '_id': 1
            }
        }
    ]
}