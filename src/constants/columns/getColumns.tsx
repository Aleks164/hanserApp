import React from "react";
import { ColumnType } from "antd/es/table";
import { ChosenProductsType } from "@/store/StatStoreContext";
import ProductImage from "@/components/ProductImage";
import { FeedbacksParams } from "@/Pages/TabTables";
import { MergeItem } from "..";
import { Row, Button } from "antd";

export type GetReportColumnType = typeof getColumns;
type GetReportColumnArgsType = {
  chosenProducts: ChosenProductsType;
  setFeedbacksParams: React.Dispatch<React.SetStateAction<FeedbacksParams>>;
};

type Re = Required<MergeItem>;

export const getColumns = ({
  chosenProducts,
  setFeedbacksParams,
}: GetReportColumnArgsType): ColumnType<MergeItem>[] => [
  {
    title: "Бар-код",
    dataIndex: "barcode",
    key: "barcode",
    fixed: "left",
    width: 90,
    sorter: (a, b) => {
      return ("" + a.barcode).localeCompare(b.barcode);
    },
  },
  {
    title: "Фото",
    dataIndex: "nmId",
    key: "nmId",
    fixed: "left",
    width: 140,
    render: (value: number, record) => (
      <ProductImage value={value} record={record} />
    ),
  },
  {
    title: "Рейтинг",
    dataIndex: "valuation",
    key: "valuation",
    fixed: "left",
    width: 140,
    sorter: (a, b) => a.nmId - b.nmId,
    render: (value: number, record) => (
      <>
        {"⭐️"} {record?.valuation || "-"}
      </>
    ),
  },
  {
    title: "Отзывы",
    dataIndex: "feedbacksCount",
    key: "feedbacksCount",
    fixed: "left",
    width: 140,
    sorter: (a, b) => a.nmId - b.nmId,
    render: (value: number, record) => (
      <Row
        style={{
          minWidth: 55,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            width: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() =>
            setFeedbacksParams((prevState) => ({
              ...prevState,
              visible: true,
              nmid: record.nmId,
            }))
          }
        >
          {"💬"}
        </Button>{" "}
        {record.feedbacksCount || "-"}
      </Row>
    ),
  },
  {
    title: "Предмет",
    dataIndex: "subject",
    key: "subject",
    width: 90,
    sorter: (a, b) => {
      return ("" + a.subject).localeCompare(b.subject);
    },
  },
  {
    title: "Артикул продавца",
    dataIndex: "supplierArticle",
    key: "supplierArticle",
    width: 125,
    sorter: (a, b) => {
      return ("" + a.supplierArticle).localeCompare(b.supplierArticle);
    },
  },
  {
    title: "Артикул WB",
    dataIndex: "nmId",
    key: "nmId",
    width: 100,
    render: (value: number, record) => {
      return (
        <div className="nmId_item" style={{ textAlign: "center" }}>
          {value}
        </div>
      );
    },
    sorter: (a, b) => a.nmId - b.nmId,
  },
  {
    title: "Размер",
    dataIndex: "techSize",
    key: "techSize",
    width: 80,
    sorter: (a, b) => {
      return ("" + a.techSize).localeCompare(b.techSize);
    },
  },
  {
    title: "Склад",
    dataIndex: "warehouseName",
    key: "warehouseName",
    width: 80,
    sorter: (a, b) => {
      return ("" + a.warehouseName).localeCompare(b.warehouseName);
    },
  },
  {
    title: "Кол-во на складе",
    dataIndex: "quantity",
    key: "quantity",
    width: 85,
    render: (value) => value || 0,
    sorter: (a, b) => a.quantity! - b.quantity!,
  },
  {
    title: "Возвращаются от клиента на склад",
    dataIndex: "inWayFromClient",
    key: "inWayFromClient",
    width: 80,
    render: (value) => value || 0,
    sorter: (a, b) => a.inWayFromClient - b.inWayFromClient,
  },
  {
    title: "Фактическая цена с учетом всех скидок",
    dataIndex: "finishedPrice",
    key: "finishedPrice",
    width: 85,
    render: (value) =>
      value === "---" ? value : (value && (+value).toFixed()) || 0,
    sorter: (a, b) => a.finishedPrice - b.finishedPrice,
  },
  {
    title: "Кол-во заказов",
    dataIndex: "orderQuantity",
    key: "orderQuantity",
    width: 85,
    render: (value) => value || 0,
    sorter: (a, b) => a.orderQuantity - b.orderQuantity,
  },
  {
    title: "Возвратов",
    dataIndex: "isCancel",
    key: "isCancel",
    width: 60,
    render: (value) => value || 0,
    sorter: (a, b) => +a.isCancel - +b.isCancel,
  },
  {
    title: "Кол-во продаж",
    dataIndex: "saleQuantity",
    key: "saleQuantity",
    width: 85,
    fixed: "right",
    render: (value) => value || 0,
    sorter: (a, b) => a.saleQuantity - b.saleQuantity,
  },
];
