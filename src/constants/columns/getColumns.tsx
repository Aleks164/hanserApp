import React from "react";
import { ColumnType } from "antd/es/table";
import { ChosenProductsType } from "@/store/StatStoreContext";
import ProductImage from "@/components/ProductImage";
import { FeedbacksParams } from "@/Pages/TabTables";
import { MergeItem } from "..";
import { Row, Button, Input } from "antd";

export type GetReportColumnType = typeof getColumns;
type GetReportColumnArgsType = {
  chosenProducts: ChosenProductsType;
  setFeedbacksParams: React.Dispatch<React.SetStateAction<FeedbacksParams>>;
};

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
    title: "Предмет",
    dataIndex: "subject",
    key: "subject",
    width: 90,
    sorter: (a, b) => ("" + a.subject).localeCompare(b.subject),
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
    sorter: {
      compare: (a, b) => +a.nmId - +b.nmId,
      multiple: 2,
    },
  },
  {
    title: "Фото",
    dataIndex: "nmId",
    key: "nmId",
    width: 50,
    render: (value: number, record) => (
      <ProductImage value={value} record={record} />
    ),
  },
  {
    title: "Отзывы",
    dataIndex: "feedbacksCount",
    key: "feedbacksCount",
    width: 50,
    sorter: (a, b) =>
      +(!isNaN(+b.feedbacksCount) && a.feedbacksCount - b.feedbacksCount),
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
        {record.feedbacksCount || "0"}
      </Row>
    ),
  },
  {
    title: "Рейтинг",
    dataIndex: "valuation",
    key: "valuation",
    sorter: (a, b) => +(!isNaN(+b.valuation) && +a.valuation - +b.valuation),
    width: 50,
    render: (value: number, record) => (
      <>
        {"⭐️"} {record?.valuation || 0}
      </>
    ),
  },
  {
    title: "Артикул продавца",
    dataIndex: "supplierArticle",
    key: "supplierArticle",
    sorter: (a, b) => ("" + a.supplierArticle).localeCompare(b.supplierArticle),
  },

  {
    title: "Размер",
    dataIndex: "techSize",
    key: "techSize",
    width: 80,
    sorter: {
      compare: (a, b) => ("" + a.techSize).localeCompare(b.techSize),
      multiple: 1,
    },
  },
  {
    title: "Фактическая цена",
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
    title: "Кол-во продаж",
    dataIndex: "saleQuantity",
    key: "saleQuantity",
    width: 85,
    render: (value) => value || 0,
    sorter: (a, b) => a.saleQuantity - b.saleQuantity,
  },
  {
    title: "Кол-во на складе",
    dataIndex: "quantity",
    key: "quantity",
    width: 85,
    fixed: "right",
    render: (value) => value || 0,
    sorter: (a, b) => a.quantity! - b.quantity!,
  },
  // {
  //   title: "Возвращаются от клиента на склад",
  //   dataIndex: "inWayFromClient",
  //   key: "inWayFromClient",
  //   width: 80,
  //   render: (value) => value || 0,
  //   sorter: (a, b) => a.inWayFromClient - b.inWayFromClient,
  // },

  // {
  //   title: "Возвратов",
  //   dataIndex: "isCancel",
  //   key: "isCancel",
  //   width: 60,
  //   render: (value) => value || 0,
  //   sorter: (a, b) => +a.isCancel - +b.isCancel,
  // },
];
