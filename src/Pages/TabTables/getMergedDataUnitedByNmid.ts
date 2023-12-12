import { MergeItem, mergeItem } from "@/constants";
import { SalesType, StocksType, OrdersType } from "@/globals"

function getMergedDataUnitedByNmid({ sales, stocks, orders }: { sales: SalesType[], stocks: StocksType[], orders: OrdersType[] }) {

    const mergeData: Record<number, MergeItem> = {};

    sales.forEach(sales => {
        if (!mergeData[sales.nmId]) {
            const { subject, techSize, supplierArticle, nmId, finishedPrice } = sales;
            mergeData[sales.nmId] = {
                ...mergeItem,
                subject, supplierArticle, nmId, finishedPrice, saleQuantity: 1
            }
        } else {
            mergeData[sales.nmId].saleQuantity += 1;
        }
    })

    orders.forEach(order => {
        if (!mergeData[order.nmId]) {
            const { subject, supplierArticle, nmId, isCancel } = order;
            mergeData[order.nmId] = {
                ...mergeItem,
                subject, supplierArticle, nmId, orderQuantity: 1, isCancel: +isCancel
            }
        } else {
            const { isCancel } = order;
            mergeData[order.nmId].orderQuantity += 1;
            mergeData[order.nmId].isCancel += +isCancel;
        }
    })

    stocks.forEach(stock => {
        if (!mergeData[stock.nmId]) {
            const { subject, supplierArticle, nmId, quantity, inWayFromClient } = stock;
            mergeData[stock.nmId] = {
                ...mergeItem,
                subject, supplierArticle, nmId, quantity, inWayFromClient
            }
        } else {
            const { quantity, inWayFromClient } = stock;
            mergeData[stock.nmId].quantity += quantity;
            mergeData[stock.nmId].inWayFromClient += inWayFromClient;
        }
    })
    return Object.values(mergeData);
}

export default getMergedDataUnitedByNmid;