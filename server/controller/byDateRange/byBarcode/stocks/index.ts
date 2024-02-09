import express from "express";
import SupplierStocks from "../../../../model/supplierStocks";
import getStocks from "./getStocks";

const stocksByDateRange = express.Router();

stocksByDateRange.get("/", async (req, res, next) => {
    try {
        const stocks = await SupplierStocks.aggregate(getStocks()).exec();
        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json(stocks);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default stocksByDateRange;
