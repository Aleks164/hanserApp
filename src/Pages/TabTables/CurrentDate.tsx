import React from "react";
import styles from "./styles.module.css";

function CurrentDate({
  firstDate,
  secondDate,
}: {
  firstDate: string;
  secondDate: string;
}) {
  return (
    <div className={styles.current_date}>{` ${firstDate.replace(
      /-/g,
      "."
    )}---${secondDate.replace(/-/g, ".")}`}</div>
  );
}

export default CurrentDate;
