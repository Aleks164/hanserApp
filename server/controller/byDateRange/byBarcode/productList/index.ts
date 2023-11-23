import express from "express";
import getProductList from "./getProductList";
import SupplierReportDetailByPeriod from "../../../../model/supplierReportDetailByPeriod";

const productListByDateRange = express.Router();

productListByDateRange.get("/", async (req, res, next) => {
    const fromDate = req.query["fromDate"] as string;
    const toDate = req.query["toDate"] as string;
    const barcods = req.query["barcods"] as string;
    const barcodeList = barcods.length ? barcods.split(",") : [];
    try {
        if (!(fromDate && toDate) || !barcodeList.length) throw new Error("Wrong date");
        const saleCount = await SupplierReportDetailByPeriod.aggregate(getProductList(fromDate, toDate, barcodeList)).exec();

        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json(saleCount);
    } catch (e: any) {
        res.status(400).json(e.message);
    }
});

export default productListByDateRange;
