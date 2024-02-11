import express from "express";
import getMergedDataByBarcode from "./getMergedDataByBarcode";
import getMergedDataByNmid from "./getMergedDataByNmid";
import getMergedDataByWarehouse from "./getMergedDataByWarehouse";
import getCachedBaseRequests from "./getCachedBaseRequests";

const statisticsByDateRange = express.Router();

statisticsByDateRange.get("/byBarCode", async (req, res, next) => {
    try {
        const fromDate = req.query["fromDate"] as string;
        const toDate = req.query["toDate"] as string;
        const { sales, stocks, orders, ratings } = await getCachedBaseRequests(fromDate, toDate);
        const statistics = getMergedDataByBarcode({ sales, stocks, orders, ratings })
        res.set('Cache-control', 'public, max-age=30000');
        res.status(200).json(statistics);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

statisticsByDateRange.get("/byNmid", async (req, res, next) => {
    try {
        const fromDate = req.query["fromDate"] as string;
        const toDate = req.query["toDate"] as string;
        const { sales, stocks, orders, ratings } = await getCachedBaseRequests(fromDate, toDate);
        const statistics = getMergedDataByNmid({ sales, stocks, orders, ratings });
        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json(statistics);
    } catch (e) {
        console.log(e);
        res.status(400).json("Bad request");
    }
});

statisticsByDateRange.get("/byWarehouse", async (req, res, next) => {
    try {
        const fromDate = req.query["fromDate"] as string;
        const toDate = req.query["toDate"] as string;

        const { sales, stocks, orders } = await getCachedBaseRequests(fromDate, toDate);

        const statistics = getMergedDataByWarehouse({ sales, stocks, orders })
        res.set('Cache-control', 'public, max-age=30000');
        res.status(200).json(statistics);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default statisticsByDateRange;
