import { ColumnType } from "antd/es/table";

import { Card } from "../../../commonTypes/cards";
import ProductImage from "@/components/ProductImage";
import React from "react";
import { MergeItem } from "..";

const productCardsColumns = [
  {
    title: "Артикул_WB",
    dataIndex: "nmID",
  },
  {
    title: "Фото",
    dataIndex: "nmID",
    width: 50,
    render: (value: number, record) => (
      <ProductImage
        value={value}
        record={{ subject: record.title } as MergeItem}
      />
    ),
  },
  {
    title: "Предмет",
    dataIndex: "subjectName",
  },
  {
    title: "Код продавца",
    dataIndex: "vendorCode",
  },
] as ColumnType<Required<Card>>[];

export default productCardsColumns;
