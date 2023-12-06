import React from "react";
import getImgSrc from "@/constants/getImageSrc";
import { TableStatRowInfoType } from "@/Pages/TabTables/onSetData";
import styles from "./styles.module.css";
import { Button, Col, Popover, Row } from "antd";
import { FeedbacksParams } from "@/Pages/TabTables";

function ProductImage({
  value,
  record,
  rating,
  setFeedbacksParams,
}: {
  value: number;
  record: TableStatRowInfoType;
  rating?: { feedbacksCount: number; valuation: string };
  setFeedbacksParams: React.Dispatch<React.SetStateAction<FeedbacksParams>>;
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
          <Row
            style={{
              minWidth: 55,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {"⭐️"} {rating?.valuation || "-"}
          </Row>
        </Popover>
        <Popover
          content={
            "💬" + " Количество отзывов " + (rating?.feedbacksCount || "")
          }
        >
          <Row
            style={{
              minWidth: 55,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                width: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                setFeedbacksParams((prevState) => ({
                  ...prevState,
                  visible: true,
                  nmid: record.nmId,
                }))
              }
            >
              {"💬"}
            </Button>{" "}
            {rating?.feedbacksCount || "-"}
          </Row>
        </Popover>
      </Col>
    </Row>
  );
}

export default ProductImage;
