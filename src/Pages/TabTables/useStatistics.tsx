import { HOST_NAME, MergeItem } from "@/constants";
import { DateTypeByCalendarType } from "@/globals";
import { useEffect, useState } from "react";
import { Filters } from ".";
import { notification } from "antd";

function useStatistics({
  date,
  currentFilter,
}: {
  date: DateTypeByCalendarType<"month" | "week" | "date" | "range"> | null;
  currentFilter: Filters;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<MergeItem[]>([]);

  useEffect(() => {
    if (!date) return;
    const fromDate = (Array.isArray(date) ? date[0] : date).format(
      "YYYY-MM-DD"
    );
    const toDate = (Array.isArray(date) ? date[1] : date).format("YYYY-MM-DD");
    let isActualRequest = true;

    async function getTableData() {
      try {
        setIsLoading(true);
        const newTableDataResponse = await fetch(
          `${HOST_NAME}/statistics/${currentFilter}?fromDate=${fromDate}&toDate=${toDate}`,
          {
            method: "GET",
          }
        );

        if (isActualRequest && newTableDataResponse.ok) {
          const newTableData =
            (await newTableDataResponse.json()) as MergeItem[];
          setTableData(newTableData);
        }
        // notification.error({ message: "sad" });
      } catch (e: any) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    getTableData();

    return () => {
      isActualRequest = false;
    };
  }, [date, currentFilter]);

  return { tableData, isLoading };
}

export default useStatistics;
