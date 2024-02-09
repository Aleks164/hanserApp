import dayjs from "dayjs"
import getOrders from "../controller/byDateRange/byBarcode/orders/getOrders";
import getSaleDataByDateRange from "../controller/byDateRange/byBarcode/sales/getSales";
import getStocks from "../controller/byDateRange/byBarcode/stocks/getStocks";
import SupplierOrders from "../model/supplierOrders";
import SupplierSales from "../model/supplierSales";
import SupplierStocks from "../model/supplierStocks";
import SupplierRating from "../model/supplierRating";
import { OrdersItem, SalesItem, StocksItem } from "../../commonTypes/api";
import getRatingFromWB, { Rating } from "./fromWB/getRatingFromWB";

async function ratingSlowUpdate(nmIds: number[]) {
    const ratingsForUpdate = nmIds.map(nmId => async () => {
        await getRatingFromWB(nmId);
        await new Promise(res => setTimeout(() => {
            console.log(nmId);
            res(nmId);
        }, 500))
    });

    for (const ratingUpdating of ratingsForUpdate) {
        await ratingUpdating();
    }
};

export default async function updateMissingRatings() {
    const currentDate = dayjs();
    const currentDateFormatted = currentDate.format("YYYY-MM-DD");
    const twoWeekBeforeDate = currentDate.subtract(60, "days").format("YYYY-MM-DD");

    const sales: Required<SalesItem>[] = await SupplierSales.aggregate(getSaleDataByDateRange(twoWeekBeforeDate, currentDateFormatted)).exec();
    const stocks: Required<StocksItem>[] = await SupplierStocks.aggregate(getStocks()).exec();
    const orders: Required<OrdersItem>[] = await SupplierOrders.aggregate(getOrders(twoWeekBeforeDate, currentDateFormatted)).exec();

    const ratings = await SupplierRating.find({}).exec() as Rating[];

    const allArticles = new Set<number>();

    sales.forEach(sale => {
        allArticles.add(sale.nmId);
    })

    stocks.forEach(stock => {
        allArticles.add(stock.nmId);
    })

    orders.forEach(order => {
        allArticles.add(order.nmId);
    })

    ratings.forEach(rating => {
        allArticles.delete(rating.nmId);
    })
    console.log(allArticles.size);
    await ratingSlowUpdate(Array.from(allArticles));
    console.log('end');
}