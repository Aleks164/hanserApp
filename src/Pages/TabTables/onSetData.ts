import { PATH_NAMES } from "@/requestDataHelpers/getCategoriesByDateRange";
import { setCalendarDate } from "@/store";

interface ReportDetailsType {
    _id: string;
    retail_price: number[];
    sale_percent: number[];
    retail_price_withdisc_rub: number[];
    delivery_rub: number[];
    ppvz_for_pay: number[];
    quantity: number[]
    subject_name: string;
    sa_name: string;
    ts_name: string;
}

interface SalesType {
    _id: string,
    "warehouseName": string,
    "barcode": string,
    "subject": string,
    "techSize": string,
    "supplierArticle": string
    "nmId": number,
    "finishedPrice": number,
    "saleQuantity"?: number
}

interface StocksType {
    _id: string;
    "techSize": string,
    "barcode": string,
    "warehouseName": string,
    "subject": string,
    "supplierArticle": string,
    "nmId": number,
    "inWayFromClient": number,
    "quantity": number
}

interface OrdersType {
    _id: string,
    "barcode": string,
    "warehouseName": string,
    "nmId": number,
    "subject": string,
    "techSize": string,
    "supplierArticle": string,
    "isCancel": boolean | number,
    "orderQuantity"?: number
}

export type TableStatRowInfoType = SalesType | StocksType | OrdersType;

async function onSetData(
    queryParams: {
        fromDate: string;
        toDate: string;
    }, setData: React.Dispatch<React.SetStateAction<TableStatRowInfoType[]>>,
    requestDataHandler: (pathName: PATH_NAMES, queryParams?: {
        fromDate: any;
        toDate: any;
    }) => Promise<Response>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        setIsLoading(true);
        setCalendarDate([queryParams.fromDate, queryParams.toDate])
        const [responseReports, responseOrders, responseStocks] = await Promise.all([requestDataHandler(PATH_NAMES.SALES, queryParams), requestDataHandler(PATH_NAMES.ORDERS, queryParams), requestDataHandler(PATH_NAMES.STOCKS)])
        const sales = await responseReports.json() as SalesType[];
        const orders = await responseOrders.json() as OrdersType[];
        const stocks = await responseStocks.json() as StocksType[];
        if (!sales || !orders || !stocks) return;
        const mergeData = {} as Record<string, TableStatRowInfoType>;
        let dataByWarehouse = {} as Record<SalesType["barcode"], any[]>;
        sales.forEach(sale => {
            sale.saleQuantity = 1;
            sale.quantity = 0;
            sale.orderQuantity = 0;
            sale.inWayFromClient = 0;
            sale.isCancel = 0;
            if (dataByWarehouse[sale.warehouseName])
                dataByWarehouse[sale.warehouseName].push(sale)
            else dataByWarehouse[sale.warehouseName] = [sale];
        });
        Object.values(dataByWarehouse)
            .map(salesByWarehouse => {
                const warehouseSalesMap = {} as Record<SalesType["barcode"], SalesType>;
                salesByWarehouse.forEach(saleByWarehouse => {
                    if (warehouseSalesMap[saleByWarehouse.barcode]) warehouseSalesMap[saleByWarehouse.barcode].saleQuantity! += 1;
                    else warehouseSalesMap[saleByWarehouse.barcode] = saleByWarehouse;
                });
                return Object.values(warehouseSalesMap);
            })
            .flat()
            .forEach(saleItem => {
                mergeData[saleItem.barcode + saleItem.warehouseName] = saleItem;
            });
        dataByWarehouse = {};

        stocks.forEach(stock => {
            if (dataByWarehouse[stock.warehouseName])
                dataByWarehouse[stock.warehouseName].push(stock)
            else dataByWarehouse[stock.warehouseName] = [stock];
        });
        Object.values(dataByWarehouse).map(stocksByWarehouse => {
            const warehouseStockMap = {} as Record<SalesType["barcode"], StocksType>;
            stocksByWarehouse.forEach(stockByWarehouse => {
                if (warehouseStockMap[stockByWarehouse.barcode]) {
                    warehouseStockMap[stockByWarehouse.barcode].quantity += stockByWarehouse.quantity;
                    warehouseStockMap[stockByWarehouse.barcode].inWayFromClient += stockByWarehouse.inWayFromClient;
                }
                else warehouseStockMap[stockByWarehouse.barcode] = stockByWarehouse;
            });
            return Object.values(warehouseStockMap);
        })
            .flat()
            .forEach(stockItem => {
                if (mergeData[stockItem.barcode + stockItem.warehouseName]) {
                    (mergeData[stockItem.barcode + stockItem.warehouseName] as StocksType).quantity = stockItem.quantity;
                    (mergeData[stockItem.barcode + stockItem.warehouseName] as StocksType).inWayFromClient = stockItem.inWayFromClient;
                }
                else mergeData[stockItem.barcode + stockItem.warehouseName] = stockItem;
            });
        dataByWarehouse = {};

        orders.forEach(order => {
            order.orderQuantity = 1;
            if (dataByWarehouse[order.warehouseName])
                dataByWarehouse[order.warehouseName].push(order)
            else dataByWarehouse[order.warehouseName] = [order];
        });
        Object.values(dataByWarehouse)
            .map(ordersByWarehouse => {
                const warehouseOrderMap = {} as Record<SalesType["barcode"], OrdersType>;
                ordersByWarehouse.forEach(orderByWarehouse => {
                    if (warehouseOrderMap[orderByWarehouse.barcode]) {
                        warehouseOrderMap[orderByWarehouse.barcode].orderQuantity! += 1;
                        (warehouseOrderMap[orderByWarehouse.barcode].isCancel as number) += 1;
                    }
                    else {
                        orderByWarehouse.saleQuantity = 0;
                        orderByWarehouse.quantity = 0;
                        orderByWarehouse.inWayFromClient = 0;
                        warehouseOrderMap[orderByWarehouse.barcode] = orderByWarehouse;

                    }
                });
                return Object.values(warehouseOrderMap);
            })
            .flat()
            .forEach(stockItem => {
                if (mergeData[stockItem.barcode + stockItem.warehouseName]) {
                    (mergeData[stockItem.barcode + stockItem.warehouseName] as OrdersType).orderQuantity = stockItem.orderQuantity;
                    (mergeData[stockItem.barcode + stockItem.warehouseName] as OrdersType).isCancel = stockItem.isCancel;
                }
                else {
                    stockItem.saleQuantity = 0;
                    stockItem.quantity = 0;
                    stockItem.inWayFromClient = 0;
                    mergeData[stockItem.barcode + stockItem.warehouseName] = stockItem;
                }
            });

        setData(Object.values(mergeData));
        setIsLoading(false);
    }
    catch (e) {
        setIsLoading(false);
        console.log(e)
    }
}

export default onSetData;