import { SalesType, OrdersType, StocksType } from "../../../../src/globals";
import SupplierOrders from "../../../model/supplierOrders";
import SupplierRating from "../../../model/supplierRating";
import SupplierSales from "../../../model/supplierSales";
import SupplierStocks from "../../../model/supplierStocks";
import DBRequestCache from "../../../utils/cache";
import { Rating } from "../../../utils/fromWB/getRatingFromWB";
import getOrders from "../byBarcode/orders/getOrders";
import getSaleDataByDateRange from "../byBarcode/sales/getSales";
import getStocks from "../byBarcode/stocks/getStocks";

async function getCachedBaseRequests(fromDate: string, toDate: string) {
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
    return { sales, stocks, orders, ratings }
}

export default getCachedBaseRequests;