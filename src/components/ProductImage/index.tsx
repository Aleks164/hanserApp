import React from "react";
import getImgSrc from "@/constants/getImageSrc";
import { TableStatRowInfoType } from "@/Pages/TabTables/onSetData";
import styles from "./styles.module.css";

function ProductImage({
  value,
  record,
  rating,
}: {
  value: number;
  record: TableStatRowInfoType;
  rating?: { feedbacksCount: number; valuation: string };
}) {
  return (
    <div className={styles.goods_info_container}>
      <div className={styles.goods_pictures_container}>
        <img
          className={styles.goods_pictures}
          src={getImgSrc(value)}
          alt={record.subject}
        />
      </div>
      {"⭐️"} {rating?.valuation}
      {"💬"} {rating?.feedbacksCount}
    </div>
  );
}

export default ProductImage;
