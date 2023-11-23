
import { calendarTypes, datePickerDictionary, dateFormat } from "@/constants";
import {
  PATH_NAMES,
} from "@/requestDataHelpers/getCategoriesByDateRange";
import { ColumnType } from "antd/es/table";
import { OrdersItem } from "../../../commonTypes/api";
import dayjs from "dayjs";
const content: any;
export default content;


export type CalendarType = (typeof calendarTypes)[number];
export type DatePikerParamsType = {
  onSetData?: (fromDate: string, toDate: string) => void,

};

export type DateTypeByCalendarType<T> = T extends "range"
  ? [dayjs.Dayjs, dayjs.Dayjs]
  : dayjs.Dayjs;
export type DateStringTypeByCalendarType<T> = T extends "range"
  ? string
  : [string, string];

export type ColumnsListType = ColumnType<Required<SalesItem>>[]