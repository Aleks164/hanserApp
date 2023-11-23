import { PATH_NAMES } from "@/requestDataHelpers/getCategoriesByDateRange";

// export const HOST_NAME = 'https://hansterstatserver.ru';
export const HOST_NAME = 'http://localhost:8880';
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