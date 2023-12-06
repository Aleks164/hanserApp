import express from "express";
import getFeedbacksFromWB, { Feedback } from "../../../../utils/fromWB/getFeedbacksFromWB";
import SupplierFeedbacks from "../../../../model/supplierFeedbacks";

const feedbacksByNmid = express.Router();

feedbacksByNmid.get("/", async (req, res, next) => {
    const nmid = req.query["nmid"] as string;
    const isAnswered = req.query["isAnswered"] as string;
    try {
        if (!(nmid)) throw new Error("Wrong nmid");
        let feedbacks: Feedback | null = await SupplierFeedbacks.findOne({
            'nmId': nmid
        }).exec();
        if (!feedbacks) {
            const feedbacksFromWB = await getFeedbacksFromWB(nmid, isAnswered);
            feedbacks = feedbacksFromWB as Feedback;
            feedbacks.nmId = nmid;
            await SupplierFeedbacks.insertMany(feedbacks);
        }
        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json(feedbacks);
    } catch (e: any) {
        res.status(400).json(e.message);
    }
});

export default feedbacksByNmid;
