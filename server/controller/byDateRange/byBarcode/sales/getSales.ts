import { PipelineStage } from "mongoose";
import { getNextDayDate } from "../../../../utils/getNextDayDate";

export default function getSaleDataByDateRange(fromDate: string, toDate: string): PipelineStage[] {
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
                "warehouseName": 1,
                "nmId": 1,
                "barcode": 1,
                "subject": 1,
                "techSize": 1,
                "finishedPrice": 1,
                "supplierArticle": 1
            }
        }, {
            '$sort': {
                'barcode': 1
            }
        }
    ]
}