
import { OrdersType, SalesType, StocksType } from "../../../../src/globals";
import { Rating } from "../../../utils/fromWB/getRatingFromWB";
import { MergeItem, mergeItem } from "../../../../src/constants/index";


function getMergedDataByBarcode({ sales, stocks, orders, ratings }: { sales: SalesType[], stocks: StocksType[], orders: OrdersType[], ratings: Rating[] }) {

    const mergeData: Record<string, MergeItem> = {};
    const articleByBarcodeMap: Record<number, Set<string>> = {};

    sales.forEach(sales => {
        articleByBarcodeMap[sales.nmId] = articleByBarcodeMap[sales.nmId] ? articleByBarcodeMap[sales.nmId].add(sales.barcode) : new Set(sales.barcode);
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
        articleByBarcodeMap[order.nmId] = articleByBarcodeMap[order.nmId] ? articleByBarcodeMap[order.nmId].add(order.barcode) : new Set(order.barcode);
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
        articleByBarcodeMap[stock.nmId] = articleByBarcodeMap[stock.nmId] ? articleByBarcodeMap[stock.nmId].add(stock.barcode) : new Set(stock.barcode);
        if (!mergeData[stock.barcode]) {
            mergeData[stock.barcode] = {
                ...mergeItem,
                ...stock
            }
        } else {
            const { quantity, inWayFromClient, inWayToClient } = stock;
            mergeData[stock.barcode].quantity += quantity;
            mergeData[stock.barcode].inWayFromClient += inWayFromClient;
            if (inWayToClient)
                mergeData[stock.barcode].inWayToClient += inWayToClient;
        }
    })

    ratings.forEach(rating => {
        articleByBarcodeMap[rating.nmId]?.forEach((barcode) => {
            if (!mergeData[barcode]) return;
            mergeData[barcode].valuation = rating.valuation || "0";
            mergeData[barcode].feedbacksCount = rating.feedbacksCount || 0;
        })
    });


    return Object.values(mergeData);
}

export default getMergedDataByBarcode;