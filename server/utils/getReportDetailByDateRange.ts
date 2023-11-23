import { PipelineStage } from "mongoose";

export default function getReportDetailByDateRange(fromDate: string, toDate: string): PipelineStage[] {

    return [
        {
            '$match': {
                'create_dt': {
                    '$gte': new Date(fromDate),
                    '$lte': new Date(toDate)
                }
            }
        }, {
            '$project': {
                'gNumber': 1,
                'date_from': 1,
                'date_to': 1,
                'quantity': 1,
                'retail_price': 1,
                'retail_amount': 1,
                'sale_percent': 1,
                'commission_percent': 1,
                'retail_price_withdisc_rub': 1,
                'delivery_amount': 1,
                'return_amount': 1,
                'delivery_rub': 1,
                'rid': 1,
                'ppvz_spp_prc': 1,
                'ppvz_for_pay': 1,
                'barcode': 1
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ]
}