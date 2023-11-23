import dayjs from "dayjs";
import { dateFormat } from "@/constants";
import { DiagramPageCalendarType } from ".";

export function getDateRangeByCalendarType(
  calendarType: DiagramPageCalendarType,
  firstDate: string
) {
  switch (calendarType) {
    case "week": {
      const endOfWeek = dayjs(firstDate).endOf("week").format(dateFormat);
      return [firstDate, endOfWeek];
    }
    case "month": {
      const endOfMonth = dayjs(firstDate).endOf("month").format(dateFormat);
      return [firstDate, endOfMonth];
    }
    case "date": {
      return [firstDate, firstDate];
    }
    default: {
      return [firstDate, firstDate];
    }
  }
}
