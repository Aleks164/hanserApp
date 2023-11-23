import { ColumnType } from "antd/es/table";
import { SalesItem } from "../../../commonTypes/api";

const saleColumns = [{
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
    title: "Дата и время продажи",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => {
        return new Date(a.date) > new Date(b.date);
    },
},
{
    title: "Согласованный итоговый дисконт",
    dataIndex: "discountPercent",
    key: "discountPercent",
    sorter: (a, b) => {
        return a.discountPercent - b.discountPercent;
    },
},
{
    title: "К перечислению продавцу",
    dataIndex: "forPay",
    key: "forPay",
    sorter: (a, b) => a.forPay - b.forPay,
},
{
    title: "Фактическая цена заказа",
    dataIndex: "finishedPrice",
    key: "finishedPrice",
    sorter: (a, b) => a.finishedPrice - b.finishedPrice,
},
{
    title: "Цена, от которой считается вознаграждение продавца",
    dataIndex: "priceWithDisc",
    key: "priceWithDisc",
    sorter: (a, b) => a.priceWithDisc - b.priceWithDisc,
},
] as ColumnType<Required<SalesItem>>[];

export default saleColumns;