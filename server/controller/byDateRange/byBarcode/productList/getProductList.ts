import { PipelineStage } from "mongoose";
import { getNextDayDate } from "../../../../utils/getNextDayDate";

export default function getProductList(fromDate: string, toDate: string, barcodeList: string[]): PipelineStage[] {
    return [
        {
            '$match': {
                '$and': [
                    {
                        'sale_dt': {
                            '$gte': new Date(fromDate),
                            '$lte': fromDate === toDate ? getNextDayDate(toDate) : new Date(toDate)
                        }
                    }, {
                        'barcode': {
                            '$in': barcodeList
                        }
                    }
                ]
            }
        }, {
            '$group': {
                '_id': '$barcode',
                'quantity': {
                    '$push': '$quantity'
                },
                'retail_price': {
                    '$push': '$retail_price'
                },
                'sale_percent': {
                    '$push': '$sale_percent'
                },
                'retail_price_withdisc_rub': {
                    '$push': '$retail_price_withdisc_rub'
                },
                'delivery_rub': {
                    '$push': '$delivery_rub'
                },
                'ppvz_for_pay': {
                    '$push': '$ppvz_for_pay'
                },
                'subject_name': {
                    '$first': '$subject_name'
                },
                'sa_name': {
                    '$first': '$sa_name'
                },
                'ts_name': {
                    '$first': '$ts_name'
                },
                'nm_id': {
                    '$first': '$nm_id'
                }
            }
        },
        {
            '$sort': {
                '_id': 1
            }
        }
    ]
}