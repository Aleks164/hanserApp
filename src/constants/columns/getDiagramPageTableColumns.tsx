import React from "react";
import { ColumnType } from "antd/es/table";
import {
  ChosenProductsType,
  SetChosenProductsType,
} from "@/store/StatStoreContext";
import AddRemoveItemToDiagramButton from "@/components/Buttons/AddRemoveItemToDiagramButton";
import ProductImage from "@/components/ProductImage";

export type GetReportColumnArgsType = {
  chosenProducts: ChosenProductsType;
};

export const getDiagramPageTableColumns = ({
  chosenProducts,
}: GetReportColumnArgsType): ColumnType<Required<any>>[] => [
  {
    title: "Бар-код",
    dataIndex: "_id",
    key: "_id",
    fixed: "left",
    width: 90,
    render: (value: string) => (
      <AddRemoveItemToDiagramButton
        key={value + "_toggle_button"}
        value={value}
        chosenProducts={chosenProducts}
      />
    ),
    sorter: (a, b) => {
      return ("" + a._id).localeCompare(b._id);
    },
  },
  {
    title: "Фото",
    dataIndex: "nm_id",
    key: "nm_id",
    fixed: "left",
    width: 70,
    render: (value: number, record) => (
      <ProductImage value={value} record={record} />
    ),
  },
  {
    title: "Предмет",
    dataIndex: "subject_name",
    key: "subject_name",
    width: 90,
    sorter: (a, b) => {
      return ("" + a._id).localeCompare(b._id);
    },
  },
];
