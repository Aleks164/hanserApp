import React, { useCallback, useEffect, useState } from "react";
import { Button, DatePicker, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import getCurrentDateByCalendarType from "./getCurrentDateByCalendarType";
import { calendarTypes, dateFormat, datePickerDictionary } from "@/constants";
import { DateTypeByCalendarType, CalendarType } from "@/globals";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
dayjs.extend(weekday);

const { RangePicker } = DatePicker;

function DatePiker({
  date,
  setDate,
}: {
  date: DateTypeByCalendarType<"date" | "week" | "month" | "range"> | null;
  setDate: React.Dispatch<
    React.SetStateAction<DateTypeByCalendarType<
      "date" | "week" | "month" | "range"
    > | null>
  >;
}) {
  const [currentCalendarType, setCalendarType] = useState<CalendarType | null>(
    "week"
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeDate = (value: dayjs.Dayjs | null, dateString: string) => {
    if (!value || !currentCalendarType || currentCalendarType === "range")
      return;
    console.log("changeDate");
    setDate(value);
  };

  const changeDateRange = (
    value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
    dateString: [string, string]
  ) => {
    if (
      !value ||
      !(value[0] && value[1]) ||
      !currentCalendarType ||
      currentCalendarType !== "range"
    )
      return;
    console.log("changeDateRange");
    setDate(value as [dayjs.Dayjs, dayjs.Dayjs]);
  };

  const toggleCalendarType = useCallback(
    (newType: CalendarType) => setCalendarType(newType),
    []
  );

  useEffect(() => {
    const prevWeekMonday = new Date();
    prevWeekMonday.setDate(
      prevWeekMonday.getDate() - ((prevWeekMonday.getDay() + 6) % 7) - 7
    );
    const prevWeekSunday = new Date(prevWeekMonday);
    prevWeekSunday.setDate(prevWeekMonday.getDate() + 6);
    console.log("start");
    setDate([dayjs(prevWeekMonday), dayjs(prevWeekSunday)]);
  }, []);

  useEffect(() => {
    if (!date || !currentCalendarType) return;
    const { currentDateByCalendarType } = getCurrentDateByCalendarType(
      currentCalendarType,
      date
    );
    console.log("changeCurrentCalendarType");
    setDate(currentDateByCalendarType);
  }, [currentCalendarType]);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Row>
        {date && currentCalendarType && (
          <>
            <Select
              defaultValue="week"
              style={{ width: 120 }}
              onChange={toggleCalendarType}
              options={calendarTypes.map((typeName) => ({
                value: typeName,
                label: datePickerDictionary[typeName],
              }))}
            />
            {currentCalendarType !== "range" && !Array.isArray(date) ? (
              <DatePicker
                open={isOpen}
                value={date}
                onChange={changeDate}
                picker={currentCalendarType}
              />
            ) : (
              Array.isArray(date) && (
                <RangePicker
                  open={isOpen}
                  value={date}
                  onChange={changeDateRange}
                  format={dateFormat}
                />
              )
            )}
            <Button onClick={() => setIsOpen((prev) => !prev)}>
              {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </Button>
          </>
        )}
      </Row>
    </Space>
  );
}

export default DatePiker;
