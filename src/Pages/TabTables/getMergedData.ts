import { MergeItem, mergeItem } from "@/constants";
import { SalesType, StocksType, OrdersType } from "@/globals"

function getMergedData({ sales, stocks, orders }: { sales: SalesType[], stocks: StocksType[], orders: OrdersType[] }) {

    const mergeData: Record<string, MergeItem> = {};

    sales.forEach(sales => {
        if (!mergeData[sales.barcode]) {
            const { subject, techSize, supplierArticle, nmId, finishedPrice } = sales;
            mergeData[sales.barcode] = {
                ...mergeItem,
                subject, supplierArticle, nmId, finishedPrice, saleQuantity: 1
            }
        } else {
            mergeData[sales.barcode].saleQuantity += 1;
        }
    })

    orders.forEach(order => {
        if (!mergeData[order.barcode]) {
            const { subject, supplierArticle, nmId, isCancel } = order;
            mergeData[order.barcode] = {
                ...mergeItem,
                subject, supplierArticle, nmId, orderQuantity: 1, isCancel: +isCancel
            }
        } else {
            const { isCancel } = order;
            mergeData[order.barcode].orderQuantity += 1;
            mergeData[order.barcode].isCancel += +isCancel;
        }
    })

    stocks.forEach(stock => {
        if (!mergeData[stock.barcode]) {
            const { subject, supplierArticle, nmId, quantity, inWayFromClient } = stock;
            mergeData[stock.barcode] = {
                ...mergeItem,
                subject, supplierArticle, nmId, quantity, inWayFromClient
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