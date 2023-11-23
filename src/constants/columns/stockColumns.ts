import { ColumnType } from "antd/es/table";
import { StocksItem } from "../../../commonTypes/api";

const stockColumns = [{
    title: "Бар-код",
    dataIndex: "barcode",
    key: "barcode",
    sorter: (a, b) => {
        return ("" + a.barcode).localeCompare(b.barcode);
    },
},
{
    title: "Дата и время обновления информации",
    dataIndex: "lastChangeDate",
    key: "lastChangeDate",
    defaultSortOrder: "descend",
    sorter: (a, b) => {
        return new Date(a.lastChangeDate) > new Date(b.lastChangeDate);
    },
},
{
    title: "Артикул продавца",
    dataIndex: "supplierArticle",
    key: "supplierArticle",
    sorter: (a, b) => {
        return ("" + a.supplierArticle).localeCompare(b.supplierArticle);
    },
},
{
    title: "Размер товара",
    dataIndex: "techSize",
    key: "techSize",
    sorter: (a, b) => {
        return ("" + a.techSize).localeCompare(b.techSize);
    },
},
{
    title: "Количество, доступное для продажи",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
},
{
    title: "Полное (непроданное) количество, которое числится за складом",
    dataIndex: "quantityFull",
    key: "quantityFull",
    sorter: (a, b) => a.quantityFull - b.quantityFull,
},
{
    title: "Артикул WB",
    dataIndex: "nmId",
    key: "nmId",
    sorter: (a, b) => a.nmId - b.nmId,
},
{
    title: "Предмет",
    dataIndex: "subject",
    key: "subject",
    sorter: (a, b) => {
        return ("" + a.subject).localeCompare(b.subject);
    },
},
{
    title: "Категория",
    dataIndex: "category",
    key: "category",
    sorter: (a, b) => {
        return ("" + a.category).localeCompare(b.category);
    },
},
{
    title: "Количество дней на сайте",
    dataIndex: "daysOnSite",
    key: "daysOnSite",
    sorter: (a, b) => a.daysOnSite - b.daysOnSite,
},
{
    title: "Бренд",
    dataIndex: "brand",
    key: "brand",
    sorter: (a, b) => {
        return ("" + a.brand).localeCompare(b.brand);
    },
},
{
    title: "Цена",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a.price - b.price,
},
{
    title: "Скидка",
    dataIndex: "discount",
    key: "discount",
    sorter: (a, b) => a.discount - b.discount,
},
] as ColumnType<Required<StocksItem>>[];

export default stockColumns;