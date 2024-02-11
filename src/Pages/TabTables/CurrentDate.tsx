import React from "react";
import styles from "./styles.module.css";

function CurrentDate({ date }: { date: [string, string] | null }) {
  if (!date) return null;
  const firstDate = date[0].split("-").splice(1).join(".");
  const secondDate = date[1].split("-").splice(1).join(".");
  return (
    <div className={styles.current_date}>{` ${firstDate}---${secondDate} ${
      date[0].split("-")[0]
    }`}</div>
  );
}

export default CurrentDate;
