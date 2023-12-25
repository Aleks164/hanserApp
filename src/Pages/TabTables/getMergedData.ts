import { MergeItem, mergeItem } from "@/constants";
import { SalesType, StocksType, OrdersType } from "@/globals"

function getMergedData({ sales, stocks, orders }: { sales: SalesType[], stocks: StocksType[], orders: OrdersType[] }) {

    const mergeData: Record<string, MergeItem> = {};

    sales.forEach(sales => {
        if (!mergeData[sales.barcode]) {
            mergeData[sales.barcode] = {
                ...mergeItem,
                ...sales, saleQuantity: 1
            }
        } else {
            mergeData[sales.barcode].saleQuantity += 1;
        }
    })

    orders.forEach(order => {
        if (!mergeData[order.barcode]) {
            const { isCancel } = order;
            mergeData[order.barcode] = {
                ...mergeItem,
                ...order, orderQuantity: 1, isCancel: +isCancel
            }
        } else {
            const { isCancel } = order;
            mergeData[order.barcode].orderQuantity += 1;
            mergeData[order.barcode].isCancel += +isCancel;
        }
    })

    stocks.forEach(stock => {
        if (!mergeData[stock.barcode]) {
            mergeData[stock.barcode] = {
                ...mergeItem,
                ...stock
            }
        } else {
            const { quantity, inWayFromClient } = stock;
            mergeData[stock.barcode].quantity += quantity;
            mergeData[stock.barcode].inWayFromClient += inWayFromClient;
        }
    })
    return Object.values(mergeData);
}

export default getMergedData;