import { PATH_NAMES } from "@/requestDataHelpers/getCategoriesByDateRange";

// export const HOST_NAME = 'https://hansterstatserver.ru';
export const HOST_NAME = 'http://hansterstatserver.ru';
// export const HOST_NAME = 'http://81.31.247.81:8880';
// export const HOST_NAME = 'http://localhost:80';
export const calendarTypes = ["month", "week", "date", "range"] as const;
export const diagramPageCalendarTypes = ["month", "week", "date"] as const;
export const datePickerDictionary = {
    month: "Месяц",
    week: "Неделя",
    date: "День",
    range: "Диапазон",
};
export const pathNameDictionary: Record<PATH_NAMES, string> = {
    [PATH_NAMES.SALES]: 'Продажи',
    [PATH_NAMES.STOCKS]: "Склад",
    [PATH_NAMES.REPORT_DETAILS]: "Отчет о продажах по реализации",
    [PATH_NAMES.ORDERS]: "Заказы"
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
    "finishedPrice": 0,
    "orderQuantity": 0,
    "isCancel": 0,
    "saleQuantity": 0,
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
    "finishedPrice": "---",
    "orderQuantity": 0,
    "isCancel": 0,
    "saleQuantity": 0,
}

export type MergeItem = typeof mergeItem;
export type StockItem = typeof stockItem;