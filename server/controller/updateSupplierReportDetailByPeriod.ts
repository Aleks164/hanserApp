import express from "express";
import SupplierReportDetailByPeriod from "../model/supplierReportDetailByPeriod";
import getSupplierReportDetailByPeriod from "../utils/fromWB/getSupplierReportDetailByPeriod";

const updateSupplierReportDetailByPeriod = express.Router();

updateSupplierReportDetailByPeriod.get("/", async (req, res, next) => {
    const date = req.query["date"] as string;
    if (!date) return next();
    const reportDetail = await getSupplierReportDetailByPeriod(date,date);
    try {
        const reportDetailFromWB = await SupplierReportDetailByPeriod.create(reportDetail);
        res.status(200).json(reportDetailFromWB);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default updateSupplierReportDetailByPeriod;