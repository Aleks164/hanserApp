import express from "express";
import SupplierReportDetailByPeriod from "../../../../model/supplierReportDetailByPeriod";
import getReportDetails from "./getReportDetails";

const reportDetailsByDateRange = express.Router();

reportDetailsByDateRange.get("/", async (req, res, next) => {
    const fromDate = req.query["fromDate"] as string;
    const toDate = req.query["toDate"] as string;
    try {
        if (!(fromDate && toDate)) throw new Error("Wrong date");
        const saleCount = await SupplierReportDetailByPeriod.aggregate(getReportDetails(fromDate, toDate)).exec();
        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json(saleCount);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default reportDetailsByDateRange;
