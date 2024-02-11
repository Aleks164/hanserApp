
import { OrdersType, SalesType, StocksType } from "../../../../src/globals";
import { MergeItem, mergeItem } from "../../../../src/constants/index";
import { Rating } from "../../../utils/fromWB/getRatingFromWB";


function getMergedDataByNmid({ sales, stocks, orders, ratings }: { sales: SalesType[], stocks: StocksType[], orders: OrdersType[], ratings: Rating[] }) {

    const mergeData: Record<string, MergeItem> = {};

    sales.forEach(sales => {
        if (!mergeData[sales.nmId]) {
            mergeData[sales.nmId] = {
                ...mergeItem,
                ...sales, saleQuantity: 1
            }
        } else {
            mergeData[sales.nmId].saleQuantity += 1;
        }
    })

    orders.forEach(order => {
        if (!mergeData[order.nmId]) {
            const { isCancel } = order;
            mergeData[order.nmId] = {
                ...mergeItem,
                ...order, orderQuantity: 1, isCancel: +isCancel
            }
        } else {
            const { isCancel } = order;
            mergeData[order.nmId].orderQuantity += 1;
            mergeData[order.nmId].isCancel += +isCancel;
        }
    })

    stocks.forEach(stock => {
        if (!mergeData[stock.nmId]) {
            mergeData[stock.nmId] = {
                ...mergeItem,
                ...stock
            }
        } else {
            const { quantity, inWayFromClient, inWayToClient } = stock;
            mergeData[stock.nmId].quantity += quantity;
            mergeData[stock.nmId].inWayFromClient += inWayFromClient;
            if (inWayToClient)
                mergeData[stock.barcode].inWayToClient += inWayToClient;
        }
    })

    ratings.forEach(rating => {
        if (mergeData[rating.nmId]) {
            mergeData[rating.nmId].valuation = rating.valuation || "0";
            mergeData[rating.nmId].feedbacksCount = rating.feedbacksCount || 0;
        }
    });


    return Object.values(mergeData);
}

export default getMergedDataByNmid;