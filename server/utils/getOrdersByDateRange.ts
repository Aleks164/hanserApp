import { PipelineStage } from "mongoose";

export default function getOrdersByDateRange(fromDate: string, toDate: string): PipelineStage[] {

    return [
        {
            '$match': {
                'date': {
                    '$gte': new Date(fromDate),
                    '$lte': new Date(toDate)
                }
            }
        }, {
            '$project': {
                'gNumber': 1,
                'date': 1,
                'barcode': 1
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ]
}