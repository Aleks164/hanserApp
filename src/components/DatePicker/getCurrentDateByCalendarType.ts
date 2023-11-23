import { dateFormat } from "@/constants";
import { CalendarType } from "@/globals";
import dayjs from "dayjs";

function getCurrentDateByCalendarType(currentCalendarType: CalendarType, date: dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) {
    let currentDateByCalendarType: dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs];
    let onChangeArguments: [string, string];
    switch (currentCalendarType) {
        case "date": {
            if (Array.isArray(date)) currentDateByCalendarType = date[0];
            else currentDateByCalendarType = date;
            onChangeArguments = [currentDateByCalendarType.format(dateFormat),
            currentDateByCalendarType.format(dateFormat)];
            break;
        }
        case "month": {
            if (Array.isArray(date)) currentDateByCalendarType = date[0];
            else currentDateByCalendarType = date;
            const month = currentDateByCalendarType.month();
            const year = currentDateByCalendarType.year();
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);
            onChangeArguments = [dayjs(firstDayOfMonth).format(dateFormat),
            dayjs(lastDayOfMonth).format(dateFormat)];
            break;
        }
        case "week": {
            if (Array.isArray(date)) currentDateByCalendarType = date[0];
            else currentDateByCalendarType = date;
            onChangeArguments = [currentDateByCalendarType.weekday(1).format(dateFormat),
            currentDateByCalendarType.weekday(7).format(dateFormat)];
            break;
        }
        case "range": {
            if (Array.isArray(date))
                currentDateByCalendarType = [date[0].weekday(1), date[0].weekday(7)];
            else currentDateByCalendarType = [date.weekday(1), date.weekday(7)];
            onChangeArguments = [currentDateByCalendarType[0].format(dateFormat),
            currentDateByCalendarType[1].format(dateFormat)];
            break;
        }
        default: {
            currentDateByCalendarType = dayjs();
            onChangeArguments = [currentDateByCalendarType.format(dateFormat),
            currentDateByCalendarType.format(dateFormat)];
        }
    }
    return { currentDateByCalendarType, onChangeArguments }
}


export default getCurrentDateByCalendarType;