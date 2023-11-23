import React, { useState } from "react";
import { Col, Row } from "antd";
import Diagram from "./Diagram";
import DatePiker from "../DatePicker/DatePiker";

export type SalesCountByDateType = Record<string, any>[];

export type SetSalesCountByDateType = React.Dispatch<
  React.SetStateAction<SalesCountByDateType>
>;

function DiagramPage() {
  const [salesCountByDate, setSalesCountByDate] =
    useState<SalesCountByDateType>([]);

  return (
    <Row
      gutter={16}
      style={{ minWidth: "1110px", margin: "10px 5px", height: "65vh" }}
    >
      <Col span={16} flex={2}>
        <Diagram salesByDate={salesCountByDate} />
      </Col>
      <Col span={8} flex={1}>
        <DatePiker setSalesCountByDate={setSalesCountByDate} />
      </Col>
    </Row>
  );
}

export default DiagramPage;
