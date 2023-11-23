import { PipelineStage } from "mongoose";

export default function getStockDataByDateRange(): PipelineStage[] {
    return [
        {
            '$match': {
                '$and': [
                    {
                        'lastChangeDate': {
                            '$gte': new Date('2023-06-01')
                        }
                    }, {
                        'quantityFull': {
                            '$gt': 0
                        }
                    }
                ]
            }
        }, {
            '$project': {
                "techSize": 1,
                "quantity": 1,
                "barcode": 1,
                "warehouseName": 1,
                "nmId": 1,
                "subject": 1,
                "supplierArticle": 1,
                "inWayFromClient": 1,
            }
        }, {
            '$sort': {
                'barcode': 1
            }
        }
    ]
}