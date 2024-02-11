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
  date: [string, string] | null;
  setDate: React.Dispatch<React.SetStateAction<[string, string] | null>>;
}) {
  const [currentCalendarType, setCalendarType] = useState<CalendarType | null>(
    "week"
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [innerDate, setInnerDate] = useState<DateTypeByCalendarType<
    "date" | "week" | "month" | "range"
  > | null>(null);

  const changeDate = (value: dayjs.Dayjs | null, dateString: string) => {
    if (!value || !currentCalendarType || currentCalendarType === "range")
      return;
    setInnerDate(value);
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
    setInnerDate(value as [dayjs.Dayjs, dayjs.Dayjs]);
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
    setInnerDate(dayjs(prevWeekMonday));
  }, []);

  useEffect(() => {
    if (!innerDate || !currentCalendarType) return;
    const { beginAndEndDateAsString } = getCurrentDateByCalendarType(
      currentCalendarType,
      innerDate
    );
    setDate(beginAndEndDateAsString);
  }, [currentCalendarType, innerDate]);
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Row>
        {innerDate && currentCalendarType && (
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
            {currentCalendarType !== "range" && !Array.isArray(innerDate) ? (
              <DatePicker
                open={isOpen}
                value={innerDate}
                onChange={changeDate}
                picker={currentCalendarType}
              />
            ) : (
              date && (
                <RangePicker
                  open={isOpen}
                  value={
                    Array.isArray(innerDate)
                      ? innerDate
                      : [dayjs(date[0]), dayjs(date[1])]
                  }
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
