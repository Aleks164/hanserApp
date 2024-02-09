import { HOST_NAME } from "@/constants";

export enum PATH_NAMES {
    SALES = 'sales', ORDERS = 'orders', STOCKS = 'stocks', REPORT_DETAILS = 'reports'
}

export function getCategoriesByDateRange(pathName: PATH_NAMES, queryParams?: { fromDate: any; toDate: any; }) {
    if (!queryParams) return fetch(`${HOST_NAME}/${pathName}`, {
        method: "GET",
    });
    const { fromDate, toDate } = queryParams;
    return fetch(`${HOST_NAME}/${pathName}?fromDate=${fromDate}&toDate=${toDate}`, {
        method: "GET",
    })
}

export const pathNameDictionary: Record<PATH_NAMES, string> = {
    [PATH_NAMES.SALES]: 'Продажи',
    [PATH_NAMES.STOCKS]: "Склад",
    [PATH_NAMES.REPORT_DETAILS]: "Отчет о продажах по реализации",
    [PATH_NAMES.ORDERS]: "Заказы"
};

