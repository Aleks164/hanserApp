
import { OrdersType, SalesType, StocksType } from "../../../../src/globals";
import { MergeItem, mergeItem } from "../../../../src/constants/index";

function getMergedDataByWarehouse({ sales, stocks, orders }: { sales: SalesType[], stocks: StocksType[], orders: OrdersType[] }) {

    const mergeData: Record<string, MergeItem> = {};

    sales.forEach(sales => {
        if (!mergeData[sales.warehouseName]) {
            mergeData[sales.barcode] = {
                ...mergeItem,
                ...sales, saleQuantity: 1
            }
        } else {
            mergeData[sales.warehouseName].saleQuantity += 1;
        }
    })

    orders.forEach(order => {
        if (!mergeData[order.warehouseName]) {
            const { isCancel } = order;
            mergeData[order.warehouseName] = {
                ...mergeItem,
                ...order, orderQuantity: 1, isCancel: +isCancel
            }
        } else {
            const { isCancel } = order;
            mergeData[order.warehouseName].orderQuantity += 1;
            mergeData[order.warehouseName].isCancel += +isCancel;
        }
    })

    stocks.forEach(stock => {
        if (!mergeData[stock.warehouseName]) {
            mergeData[stock.warehouseName] = {
                ...mergeItem,
                ...stock
            }
        } else {
            const { quantity, inWayFromClient, inWayToClient } = stock;
            mergeData[stock.warehouseName].quantity += quantity;
            mergeData[stock.warehouseName].inWayFromClient += inWayFromClient;
            if (inWayToClient)
                mergeData[stock.barcode].inWayToClient += inWayToClient;
        }
    })

    return Object.values(mergeData);
}

export default getMergedDataByWarehouse;