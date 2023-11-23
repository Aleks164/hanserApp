import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, DatePicker, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import getCurrentDateByCalendarType from "./getCurrentDateByCalendarType";
import { calendarTypes, dateFormat, datePickerDictionary } from "@/constants";
import {
  DatePikerParamsType,
  DateTypeByCalendarType,
  CalendarType,
} from "@/globals";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
dayjs.extend(weekday);

const { RangePicker } = DatePicker;

function DatePiker({ onSetData = () => {} }: DatePikerParamsType) {
  const [date, setDate] = useState<DateTypeByCalendarType<CalendarType> | null>(
    null
  );
  const [currentCalendarType, setCalendarType] = useState<CalendarType | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeDate = (value: dayjs.Dayjs | null, dateString: string) => {
    if (!value || !currentCalendarType || currentCalendarType === "range")
      return;
    const { onChangeArguments } = getCurrentDateByCalendarType(
      currentCalendarType,
      value
    );
    onSetData(...onChangeArguments);
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
    onSetData(...dateString);
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

    setCalendarType("week");
    setDate(dayjs(prevWeekMonday));
  }, []);

  useEffect(() => {
    if (!date || !currentCalendarType) return;
    const { currentDateByCalendarType, onChangeArguments } =
      getCurrentDateByCalendarType(currentCalendarType, date);
    onSetData(...onChangeArguments);
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
