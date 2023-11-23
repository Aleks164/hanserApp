import React, { useCallback, useEffect, useState } from "react";
import Diagram from "@/components/Diagram/Diagram";
import { Col, DatePicker, Divider, Row, Select, Spin } from "antd";
import {
  dateFormat,
  datePickerDictionary,
  diagramPageCalendarTypes,
} from "@/constants";
import { CalendarType } from "@/globals";
import DataTable from "@/components/DataTable/Index";
import { getDiagramPageTableColumns } from "@/constants/columns/getDiagramPageTableColumns";
import { getDateRangeByCalendarType } from "./getDateRangeByCalendarType";
import setDiagramNewItemsList from "./setDiagramNewItemsList";
import { $chosenProducts, $calendarDate, setChosenProducts } from "@/store";
import { useStore } from "effector-react";
import dayjs from "dayjs";

export type DiagramPageCalendarType = Exclude<CalendarType, "range">;

function Diagrams() {
  const [currentCalendarType, setCalendarType] =
    useState<DiagramPageCalendarType>("week");
  const [isLoading, setIsLoading] = useState(false);
  const [itemsList, setItemsList] = useState<Record<string, number>[]>([]);
  const [diagramType, setDiagramType] = useState<string>("");
  const [currentDateFirstDate, setCurrentDateFirstDate] = useState<
    string | null
  >(null);

  const chosenProducts = useStore($chosenProducts);
  const [firstDate] = useStore($calendarDate);

  const toggleCalendarType = useCallback(
    (newType: DiagramPageCalendarType) => setCalendarType(newType),
    []
  );

  useEffect(() => {
    if (firstDate) setCurrentDateFirstDate(firstDate);
  }, [firstDate]);

  useEffect(() => {
    if (!currentDateFirstDate) return;
    const [startOfRange, endOfRange] = getDateRangeByCalendarType(
      currentCalendarType,
      currentDateFirstDate
    );
    setDiagramNewItemsList({
      startOfRange,
      endOfRange,
      chosenProducts,
      setIsLoading,
      setItemsList,
    });
  }, [currentCalendarType, currentDateFirstDate, chosenProducts]);

  const onChangeDateRange = (value: dayjs.Dayjs | null, dateString: string) => {
    if (!value) return;
    setCurrentDateFirstDate(dateString);
  };

  const handleDiagramTypeChange = (value: string) => {
    setDiagramType(value);
  };

  const optionsList = itemsList[0]
    ? Object.entries(itemsList[0])
        .filter(([_, value]) => typeof value === "number")
        .map(([key]) => ({
          value: key,
          label: key,
        }))
    : [];

  return (
    <Row style={{ width: "90vw", height: "80vh" }}>
      <Col flex={1} style={{ padding: 20 }}>
        <DatePicker
          onChange={onChangeDateRange}
          value={dayjs(firstDate)}
          format={dateFormat}
          picker={currentCalendarType}
        />
        <Select
          defaultValue="week"
          style={{ width: 120 }}
          onChange={toggleCalendarType}
          options={diagramPageCalendarTypes.map((typeName) => ({
            value: typeName,
            label: datePickerDictionary[typeName],
          }))}
        />
        <Select
          defaultValue={optionsList?.length ? optionsList[0].value : ""}
          style={{ width: 120 }}
          onChange={handleDiagramTypeChange}
          options={optionsList}
        />
        <Divider style={{ margin: "5px 0" }} />
        <DataTable
          itemsList={itemsList}
          columns={getDiagramPageTableColumns({
            chosenProducts,
          })}
          loading={isLoading}
        />
        <Divider />
      </Col>
      <Col flex={2} style={{ position: "relative" }}>
        <Diagram salesByDate={itemsList} diagramType={diagramType} />
        {isLoading && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: " 0",
              display: " flex",
              alignItems: " center",
              justifyContent: " center",
              backgroundColor: "#ffffff6e",
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </Col>
    </Row>
  );
}

export default Diagrams;
