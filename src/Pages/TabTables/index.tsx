import React, { useCallback, useEffect, useState } from "react";
import { Row } from "antd";
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

export interface Rating {
  valuation: string;
  feedbacksCount: number;
  nmId: number;
}

function TabTables() {
  const [itemsList, setItemsList] = useState<TableStatRowInfoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
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
    const timeoutId = setTimeout(() => {
      const nmId_items = document.getElementsByClassName(
        "nmId_item"
      ) as HTMLCollectionOf<HTMLDivElement>;
      const rating_items = Array.from(nmId_items).map((item) => item.innerText);
      console.log(rating_items);
      if (!rating_items.length) return;
      const newRatingMap: Record<string, string> = {};
      rating_items.forEach((el) => {
        if (el) newRatingMap[el] = el;
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
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [itemsList, currentPage]);

  return (
    <div style={{ marginTop: 10 }}>
      <Row>
        <DatePiker onSetData={onSetDataHandler} />
        <CurrentDate firstDate={firstDate} secondDate={secondDate} />
        <ExcelImporter
          data={itemsList}
          fileName={dayjs(new Date()).format(dateFormat)}
        />
      </Row>
      <Row style={{ marginTop: 10 }} gutter={4}>
        <DataTable
          itemsList={itemsList}
          setCurrentPage={setCurrentPage}
          columns={getColumns({ chosenProducts, rating: ratingMap })}
          loading={isLoading}
        />
      </Row>
    </div>
  );
}

export default TabTables;
