import { PipelineStage } from "mongoose";

export default function getProductList(nmidList: string[]): PipelineStage[] {
    return [
        {
            '$match': {
                'nmId': {
                    '$in': nmidList
                }
            }
        }
    ]
}