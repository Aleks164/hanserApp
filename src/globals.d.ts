
import { calendarTypes, datePickerDictionary, dateFormat } from "@/constants";
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

export interface ReportDetailsType {
  _id: string;
  retail_price: number[];
  sale_percent: number[];
  retail_price_withdisc_rub: number[];
  delivery_rub: number[];
  ppvz_for_pay: number[];
  quantity: number[]
  subject_name: string;
  sa_name: string;
  ts_name: string;
}

export interface SalesType {
  _id: string,
  "warehouseName": string,
  "barcode": string,
  "subject": string,
  "techSize": string,
  "supplierArticle": string
  "nmId": number,
  "finishedPrice": number,
}

export interface SalesTableType extends SalesType {
  "saleQuantity": number
}

export interface StocksType {
  _id: string;
  "techSize": string,
  "barcode": string,
  "warehouseName": string,
  "subject": string,
  "supplierArticle": string,
  "nmId": number,
  "inWayFromClient": number,
  "inWayToClient": number,
  "quantity": number
}

export interface OrdersType {
  _id: string,
  "barcode": string,
  "warehouseName": string,
  "nmId": number,
  "subject": string,
  "techSize": string,
  "supplierArticle": string,
  "isCancel": boolean | number,
}

export interface SalesTableType extends SalesType {
  "orderQuantity"?: number;
}

export type TableStatRowInfoType = SalesType | StocksType | OrdersType;
