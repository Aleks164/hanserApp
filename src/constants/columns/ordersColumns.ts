import { ColumnType } from "antd/es/table";
import { OrdersItem } from "../../../commonTypes/api";

const ordersColumns = [{
    title: "Бар-код",
    dataIndex: "barcode",
    key: "barcode",
    defaultSortOrder: "descend",
    sorter: (a, b) => {
        return ("" + a.barcode).localeCompare(b.barcode);
    },
},
{
    title: "Номер заказа",
    dataIndex: "gNumber",
    key: "gNumber",
    sorter: (a, b) => {
        return ("" + a.gNumber).localeCompare(b.gNumber);
    },
},
{
    title: "Дата и время заказа",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => {
        return new Date(a.date) > new Date(b.date);
    },
},

] as ColumnType<Required<OrdersItem>>[];

export default ordersColumns;