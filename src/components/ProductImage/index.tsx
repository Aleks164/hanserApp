import React from "react";
import getImgSrc from "@/constants/getImageSrc";
import { TableStatRowInfoType } from "@/Pages/TabTables/onSetData";
import styles from "./styles.module.css";
import { Col, Popover, Row } from "antd";

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
    <Row className={styles.goods_info_container}>
      <Col span={10} className={styles.goods_pictures_container}>
        <Popover
          content={
            <img
              style={{
                width: 250,
                height: 350,
              }}
              src={getImgSrc(value)}
              alt={record.subject}
            />
          }
          placement="right"
          trigger="hover"
        >
          <img
            className={styles.goods_pictures}
            src={getImgSrc(value)}
            alt={record.subject}
          />
        </Popover>
      </Col>
      <Col span={14}>
        <Popover content={"⭐️" + " Рейтинг " + (rating?.valuation || "")}>
          <Row style={{ minWidth: 55 }}>
            {"⭐️"} {rating?.valuation || "-"}
          </Row>
        </Popover>
        <Popover
          content={
            "💬" + " Количество отзывов " + (rating?.feedbacksCount || "")
          }
        >
          <Row style={{ minWidth: 55 }}>
            {"💬"} {rating?.feedbacksCount || "-"}
          </Row>
        </Popover>
      </Col>
    </Row>
  );
}

export default ProductImage;
