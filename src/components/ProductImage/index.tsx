import React from "react";
import getImgSrc from "@/constants/getImageSrc";
import styles from "./styles.module.css";
import { Button, Col, Popover, Row } from "antd";
import { FeedbacksParams } from "@/Pages/TabTables";
import { MergeItem } from "@/constants";

function ProductImage({ value, record }: { value: number; record: MergeItem }) {
  return (
    <Row className={styles.goods_info_container}>
      <Col className={styles.goods_pictures_container}>
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
    </Row>
  );
}

export default ProductImage;
