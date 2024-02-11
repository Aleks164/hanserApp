import React, { useEffect, useState } from "react";
import { Radio, RadioChangeEvent, Row } from "antd";
import dayjs from "dayjs";

import DataTable from "@/components/DataTable/Index";
import DatePiker from "@/components/DatePicker/DatePiker";
import ExcelImporter from "@/components/ExcelImporter";
import CurrentDate from "./CurrentDate";
import { getColumns } from "@/constants/columns/getColumns";
import { dateFormat } from "@/constants";
import { $chosenProducts, $calendarDate } from "@/store";
import { useStore } from "effector-react";
import styles from "./styles.module.css";
import {
  SalesType,
  OrdersType,
  StocksType,
  CalendarType,
  DateTypeByCalendarType,
} from "@/globals";
import useStatistics from "./useStatistics";
import Feedbacks from "./Feedbacks";
import getFeedbacksByNmId, {
  Feedback,
  FEEDBACK_PATH_NAMES,
  FeedbackData,
} from "@/requestDataHelpers/getFeedbacksByNmId";

export interface Rating {
  valuation: string;
  feedbacksCount: number;
  nmId: number;
}

export interface PageParams {
  current: number;
  pageSize: number;
  field: React.Key;
  order: string;
  currentDataSource: Record<string, any>[];
}

export interface FeedbacksParams {
  visible?: boolean;
  nmid?: number;
  isAnswered?: boolean;
  data?: Feedback[];
}

export interface ItemsMap {
  sales: SalesType[];
  orders: OrdersType[];
  stocks: StocksType[];
}

export type Filters = "byWarehouse" | "byNmid" | "byBarCode";

const optionsWithDisabled = [
  { label: "По Артикулу WB", value: "byNmid" },
  // { label: "По складам", value: "byWarehouse" },
  { label: "Без группировки", value: "byBarCode" },
];

function TabTables() {
  const [currentFilter, setCurrentFilter] = useState<Filters>("byNmid");
  const [feedbacksParams, setFeedbacksParams] = useState<FeedbacksParams>({});
  const [date, setDate] = useState<[string, string] | null>(null);
  const chosenProducts = useStore($chosenProducts);

  const { tableData, isLoading } = useStatistics({ date, currentFilter });

  useEffect(() => {
    if (!feedbacksParams.visible || !feedbacksParams.nmid) return;
    async function getFeedbacks() {
      const feedback = await getFeedbacksByNmId(
        FEEDBACK_PATH_NAMES.FEEDBACK,
        feedbacksParams.nmid!,
        true
        // !!feedbacksParams.isAnswered
      );
      const parsedFeedbacks = (await feedback.json()) as FeedbackData;
      if (feedbacksParams.visible)
        setFeedbacksParams((prevState) => ({
          ...prevState,
          data: parsedFeedbacks?.data?.feedbacks || [],
        }));
    }
    try {
      getFeedbacks();
    } catch (e) {
      console.log(e);
    }
  }, [
    feedbacksParams.isAnswered,
    feedbacksParams.visible,
    feedbacksParams.nmid,
  ]);

  const onChangeFilter = ({ target: { value } }: RadioChangeEvent) => {
    setCurrentFilter(value);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Row>
        <DatePiker date={date} setDate={setDate} />
        <CurrentDate date={date} />
        <Row className={styles.button_container}>
          <ExcelImporter
            data={tableData}
            fileName={dayjs(new Date()).format(dateFormat)}
          />
          <Radio.Group
            style={{ marginLeft: 20 }}
            options={optionsWithDisabled}
            onChange={onChangeFilter}
            value={currentFilter}
            optionType="button"
            buttonStyle="solid"
          />
        </Row>
        <DataTable
          itemsList={tableData}
          columns={getColumns({
            chosenProducts,
            setFeedbacksParams,
          })}
          loading={isLoading}
        />
        <Feedbacks
          feedbacksParams={feedbacksParams}
          setFeedbacksParams={setFeedbacksParams}
        />
      </Row>
    </div>
  );
}

export default TabTables;
