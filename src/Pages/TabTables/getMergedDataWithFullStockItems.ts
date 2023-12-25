import { StockItem, stockItem } from "@/constants";
import { SalesType, StocksType, OrdersType } from "@/globals"

function getMergedData({ sales, stocks, orders }: { sales: SalesType[], stocks: StocksType[], orders: OrdersType[] }) {

    const mergeData: Record<string, StockItem> = {};

    sales.forEach(sales => {
        if (!mergeData[sales.warehouseName]) {
            const { warehouseName } = sales;
            mergeData[sales.warehouseName] = {
                ...stockItem, warehouseName,
                saleQuantity: 1
            }
        } else {
            mergeData[sales.warehouseName].saleQuantity += 1;
        }
    })

    orders.forEach(order => {
        if (!mergeData[order.warehouseName]) {
            const { isCancel, warehouseName } = order;
            mergeData[order.warehouseName] = {
                ...stockItem, warehouseName,
                orderQuantity: 1, isCancel: +isCancel
            }
        } else {
            const { isCancel } = order;
            mergeData[order.warehouseName].orderQuantity += 1;
            mergeData[order.warehouseName].isCancel += +isCancel;
        }
    })

    stocks.forEach(stock => {
        if (!mergeData[stock.warehouseName]) {
            const { quantity, inWayFromClient, warehouseName } = stock;
            mergeData[stock.warehouseName] = {
                ...stockItem,
                quantity, inWayFromClient, warehouseName
            }
        } else {
            const { quantity, inWayFromClient } = stock;
            mergeData[stock.warehouseName].quantity += quantity;
            mergeData[stock.warehouseName].inWayFromClient += inWayFromClient;
        }
    })
    return Object.values(mergeData);
}

export default getMergedData;