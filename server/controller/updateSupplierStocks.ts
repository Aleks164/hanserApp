import express from "express";
import getSupplierStocksFromWB from "../utils/fromWB/getSupplierStocksFromWB";
import SupplierStocks from "../model/supplierStocks";

const updateSupplierStocks = express.Router();

updateSupplierStocks.get("/", async (req, res, next) => {
    const date = req.query["date"] as string;
    if (!date) return next();
    const stocksListFromWB = await getSupplierStocksFromWB(date);
    try {
        const stocks = await SupplierStocks.create(stocksListFromWB);
        res.status(200).json(stocks);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default updateSupplierStocks;
