import React, { useCallback, useEffect, useState } from "react";
import { Button, Row, Tooltip } from "antd";
import DataTable from "@/components/DataTable/Index";
import DatePiker from "@/components/DatePicker/DatePiker";
import ExcelImporter from "@/components/ExcelImporter";
import CurrentDate from "./CurrentDate";
import getCategoriesByDateRange from "@/requestDataHelpers/getCategoriesByDateRange";
import onSetData, { TableStatRowInfoType } from "./onSetData";
import { getColumns } from "@/constants/columns/getColumns";
import { dateFormat } from "@/constants";
import dayjs from "dayjs";
import { $chosenProducts, $calendarDate } from "@/store";
import { useStore } from "effector-react";
import getRatingByNmId, {
  RATING_PATH_NAMES,
} from "@/requestDataHelpers/getRatingByNmId";
import { DiffOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

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

function TabTables() {
  const [itemsList, setItemsList] = useState<TableStatRowInfoType[]>([]);
  const [isStockFilterOn, setIsStockFilterOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageParams, setCurrentPageParams] = useState<PageParams>(
    {} as PageParams
  );
  const [ratingMap, setRatingMap] = useState<
    Record<string, { feedbacksCount: number; valuation: string }>
  >({});

  const chosenProducts = useStore($chosenProducts);
  const [firstDate, secondDate] = useStore($calendarDate);
  const onSetDataHandler = useCallback(
    (fromDate: string, toDate: string) =>
      onSetData(
        { fromDate, toDate },
        setItemsList,
        getCategoriesByDateRange,
        setIsLoading
      ),
    []
  );

  useEffect(() => {
    let { pageSize, currentDataSource, current } = currentPageParams;
    console.log(currentDataSource);
    if (!currentDataSource && !itemsList.length) return;
    if (!currentDataSource && itemsList.length) {
      current = 1;
      pageSize = 10;
      currentDataSource = itemsList;
    }

    currentDataSource = currentDataSource.slice(
      (current - 1) * pageSize,
      pageSize * current
    );

    const newRatingMap: Record<string, string> = {};
    currentDataSource.forEach((el) => {
      if (el.nmId) newRatingMap[el.nmId] = el.nmId;
    });
    async function getRating() {
      const nmidAsString = Object.keys(newRatingMap).join(",");
      const ratingItems = await getRatingByNmId(
        RATING_PATH_NAMES.RATING,
        nmidAsString
      );
      const parsedItems = await ratingItems.json();
      setRatingMap(parsedItems);
      console.log(parsedItems);
    }
    getRating();
  }, [itemsList, currentPageParams]);

  return (
    <div style={{ marginTop: 10 }}>
      <Row>
        <DatePiker onSetData={onSetDataHandler} />
        <CurrentDate firstDate={firstDate} secondDate={secondDate} />
        <Row className={styles.button_container}>
          <ExcelImporter
            data={itemsList}
            fileName={dayjs(new Date()).format(dateFormat)}
          />
          <Tooltip
            title={"Убрать склад без заказов и продаж за текущий период"}
            placement="right"
          >
            <Button disabled type="primary" icon={<DiffOutlined />} />
          </Tooltip>
        </Row>
        <DataTable
          itemsList={itemsList}
          setCurrentPageParams={setCurrentPageParams}
          columns={getColumns({ chosenProducts, rating: ratingMap })}
          loading={isLoading}
        />
      </Row>
    </div>
  );
}

export default TabTables;
