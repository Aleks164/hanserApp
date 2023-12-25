import { PipelineStage } from "mongoose";
import { getNextDayDate } from "../../../../utils/getNextDayDate";

export default function getOrdersDataByDateRange(fromDate: string, toDate: string): PipelineStage[] {
    return [
        {
            '$match': {
                'date': {
                    '$gte': new Date(fromDate),
                    '$lte': getNextDayDate(toDate)
                }
            }
        }, {
            '$project': {
                "barcode": 1,
                "warehouseName": 1,
                "nmId": 1,
                "subject": 1,
                "techSize": 1,
                "supplierArticle": 1,
                "isCancel": 1
            }
        }, {
            '$sort': {
                'barcode': 1
            }
        }
    ]
}