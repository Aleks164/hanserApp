import express from "express";
import { OrdersType, SalesType, StocksType } from "../../../../src/globals";
import SupplierOrders from "../../../model/supplierOrders";
import SupplierRating from "../../../model/supplierRating";
import SupplierSales from "../../../model/supplierSales";
import SupplierStocks from "../../../model/supplierStocks";
import { Rating } from "../../../utils/fromWB/getRatingFromWB";
import getOrders from "../byBarcode/orders/getOrders";
import getSaleDataByDateRange from "../byBarcode/sales/getSales";
import getStocks from "../byBarcode/stocks/getStocks";
import getMergedDataByBarcode from "./getMergedDataByBarcode";
import getMergedDataByNmid from "./getMergedDataByNmid";
import getMergedDataByWarehouse from "./getMergedDataByWarehouse";
import DBRequestCache from "../../../utils/cache";

const statisticsByDateRange = express.Router();

statisticsByDateRange.get("/byBarCode", async (req, res, next) => {
    try {
        const fromDate = req.query["fromDate"] as string;
        const toDate = req.query["toDate"] as string;

        const sales: Required<SalesType>[] = await SupplierSales.aggregate(getSaleDataByDateRange(fromDate, toDate)).exec();
        const orders: Required<OrdersType>[] = await SupplierOrders.aggregate(getOrders(fromDate, toDate)).exec();
        const stocks: Required<StocksType>[] = await SupplierStocks.aggregate(getStocks()).exec();
        const ratings = await SupplierRating.find({}).exec() as Rating[];

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
        let sales: Required<SalesType>[] | undefined = DBRequestCache.get(`${fromDate}_${toDate}_sales`);
        if (!sales) {
            sales = await SupplierSales.aggregate(getSaleDataByDateRange(fromDate, toDate)).exec();
            DBRequestCache.set(`${fromDate}_${toDate}_sales`, sales);
        }

        let orders: Required<OrdersType>[] | undefined = DBRequestCache.get(`${fromDate}_${toDate}_orders`);
        if (!orders) {
            orders = await SupplierOrders.aggregate(getOrders(fromDate, toDate)).exec();
            DBRequestCache.set(`${fromDate}_${toDate}_orders`, orders);
        }

        let stocks: Required<StocksType>[] | undefined = DBRequestCache.get('stocks');
        if (!stocks) {
            stocks = await SupplierStocks.aggregate(getStocks()).exec();
            DBRequestCache.set('stocks', stocks);
        }

        let ratings: Rating[] | undefined = DBRequestCache.get('ratings');
        if (!ratings) {
            ratings = await SupplierRating.find({}).exec() as Rating[];
            console.log(ratings.length);
            DBRequestCache.set('ratings', ratings);
        }
        console.log(DBRequestCache.keys())
        const statistics = getMergedDataByNmid({ sales, stocks, orders, ratings })
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

        const sales: Required<SalesType>[] = await SupplierSales.aggregate(getSaleDataByDateRange(fromDate, toDate)).exec();
        const orders: Required<OrdersType>[] = await SupplierOrders.aggregate(getOrders(fromDate, toDate)).exec();
        const stocks: Required<StocksType>[] = await SupplierStocks.aggregate(getStocks()).exec();

        const statistics = getMergedDataByWarehouse({ sales, stocks, orders })
        res.set('Cache-control', 'public, max-age=30000');
        res.status(200).json(statistics);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default statisticsByDateRange;
