import SupplierReportDetailByPeriod from "../model/supplierReportDetailByPeriod";
import getSupplierReportDetailByPeriod from "../utils/fromWB/getSupplierReportDetailByPeriod";
import SupplierStocks from "../model/supplierStocks";
import SupplierOrders from "../model/supplierOrders";
import getSupplierOrdersFromWB from "./fromWB/getSupplierOrdersFromWB";
import getSupplierStocksFromWB from "./fromWB/getSupplierStocksFromWB";
import dayjs from "dayjs";
import getSupplierSalesFromWB from "./fromWB/getSupplierSalesFromWB";
import SupplierSales from "../model/supplierSales";

async function regularUpdateMongoDB() {
    try {
        //--------------get latest Sales item in DB ----------------------------------------------------------------
        const latestSalesItem = await SupplierSales.find().sort({ date: -1 }).limit(1).exec();
        const salesDateFrom = latestSalesItem?.[0];

        if (!salesDateFrom) throw new Error('Latest Sales is not found');
        const salesNextSecondsDate = dayjs(new Date(String(salesDateFrom.date))).add(1, 'second').format('YYYY-MM-DDTHH:mm:ss');
        const sales = await getSupplierSalesFromWB(salesNextSecondsDate);
        await SupplierSales.insertMany(sales);

        //--------------get latest Orders item in DB ----------------------------------------------------------------
        const latestStockItem = await SupplierOrders.find().sort({ date: -1 }).limit(1).exec();
        const dateFrom = latestStockItem?.[0];
        if (!dateFrom) throw new Error('Latest Orders is not found');
        const nextSecondsDate = dayjs(new Date(String(dateFrom.date))).add(1, 'second').format('YYYY-MM-DDTHH:mm:ss');

        //--------------get from WB Orders items after latests Order item from DB and past them to DB ----------------
        const orders = await getSupplierOrdersFromWB(nextSecondsDate);
        // await SupplierStocks.create(stocks);
        await SupplierOrders.insertMany(orders);

        //--------------replace all stocks items in DB by WB data ---------------------------------------------------- 
        await SupplierStocks.deleteMany({});
        const stocks = await getSupplierStocksFromWB("2022-01-01");
        // await SupplierOrders.create(orders);
        await SupplierStocks.insertMany(stocks);
    } catch (e) {
        console.log("Error while saving data to MongoDB", e);
    }
};

export default regularUpdateMongoDB;