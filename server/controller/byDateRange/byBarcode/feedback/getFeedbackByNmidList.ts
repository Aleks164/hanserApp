import { PipelineStage } from "mongoose";

export default function getProductList(nmid: string): PipelineStage[] {
    return [
        {
            '$match': {
                'nmid': nmid
            }
        }
    ]
}