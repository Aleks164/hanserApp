
// console.log("===========", process.env)
// export const HOST_NAME = process.env.npm_config_mode === "dev" ? 'http://localhost:80' : 'http://81.31.247.81:80';
export const HOST_NAME = 'http://localhost:80';
export const calendarTypes = ["month", "week", "date", "range"] as const;
export const diagramPageCalendarTypes = ["month", "week", "date"] as const;
export const datePickerDictionary = {
    month: "Месяц",
    week: "Неделя",
    date: "День",
    range: "Диапазон",
};

export const dateFormat = "YYYY-MM-DD";

export const mergeItem = {
    "barcode": "---",
    "subject": "",
    "supplierArticle": "",
    "techSize": "---",
    "warehouseName": "---",
    "nmId": 0,
    "quantity": 0,
    "inWayFromClient": 0,
    "inWayToClient": 0,
    "finishedPrice": 0,
    "orderQuantity": 0,
    "isCancel": 0,
    "saleQuantity": 0,
    "valuation": "0",
    "feedbacksCount": 0,
}

export const stockItem = {
    "barcode": "---",
    "subject": "---",
    "supplierArticle": "---",
    "techSize": "---",
    "warehouseName": "---",
    "nmId": "---",
    "quantity": 0,
    "inWayFromClient": 0,
    "inWayToClient": 0,
    "finishedPrice": "---",
    "orderQuantity": 0,
    "isCancel": 0,
    "saleQuantity": 0,
    "valuation": "0",
    "feedbacksCount": 0,
}

export type MergeItem = typeof mergeItem;
export type StockItem = typeof stockItem;