import { OrdersType, SalesType, StocksType, TableStatRowInfoType } from "@/globals";


function getMergedDataWithFullStockItems({ sales, stocks, orders }: { sales: SalesType[], stocks: StocksType[], orders: OrdersType[] }) {
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
    return Object.values(mergeData);
}
export default getMergedDataWithFullStockItems;