import React from "react";
import styles from "./styles.module.css";
import { DateTypeByCalendarType } from "@/globals";

function CurrentDate({
  date,
}: {
  date: DateTypeByCalendarType<"month" | "week" | "date" | "range"> | null;
}) {
  if (!date) return null;
  const firstDate = (Array.isArray(date) ? date[0] : date).format("YYYY-MM-DD");
  const secondDate = (Array.isArray(date) ? date[1] : date).format(
    "YYYY-MM-DD"
  );
  return (
    <div className={styles.current_date}>{` ${firstDate.replace(
      /-/g,
      "."
    )}---${secondDate.replace(/-/g, ".")}`}</div>
  );
}

export default CurrentDate;
