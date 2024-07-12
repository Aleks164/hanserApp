import React, { useState } from "react";
import { Modal, Card, Avatar, Select, Row, Space, Col } from "antd";
import Meta from "antd/es/card/Meta";
import dayjs from "dayjs";
import getImgSrc from "@/constants/getImageSrc";
import styles from "./styles.module.css";

import { FeedbacksParams } from ".";

interface FeedbacksProps {
  feedbacksParams: FeedbacksParams;
  setFeedbacksParams: React.Dispatch<React.SetStateAction<FeedbacksParams>>;
}

interface FilterSortParams {
  sortOrder: "ascending" | "descending";
  sorterField: "rating" | "date";
}

function Feedbacks({ feedbacksParams, setFeedbacksParams }: FeedbacksProps) {
  const [filterSortParams, setFilterSortParams] = useState<FilterSortParams>({
    sortOrder: "ascending",
    sorterField: "rating",
  });

  return (
    <Modal
      open={feedbacksParams.visible}
      title="Отзывы"
      cancelText="Закрыть"
      width={800}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() =>
        setFeedbacksParams((prevState) => ({
          ...prevState,
          visible: false,
        }))
      }
    >
      <Row gutter={12}>
        <Col span={12}>
          <Select
            value={filterSortParams.sortOrder}
            style={{ width: "100%" }}
            onChange={(value) =>
              setFilterSortParams((prev) => ({
                ...prev,
                sortOrder: value,
              }))
            }
            options={[
              {
                value: "ascending",
                label: "По возрастанию",
              },
              {
                value: "descending",
                label: "По убыванию",
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <Select
            value={filterSortParams.sorterField}
            style={{ width: "100%" }}
            onChange={(value) =>
              setFilterSortParams((prev) => ({
                ...prev,
                sorterField: value,
              }))
            }
            options={[
              {
                value: "rating",
                label: "Рейтинг",
              },
              {
                value: "date",
                label: "Дата",
              },
            ]}
          />
        </Col>
      </Row>
      {feedbacksParams.data &&
        feedbacksParams.data
          .filter((feedback) => feedback.text)
          .sort((a, b) => {
            if (filterSortParams.sorterField === "rating") {
              if (filterSortParams.sortOrder === "ascending")
                return a.productValuation - b.productValuation;
              return b.productValuation - a.productValuation;
            } else {
              if (filterSortParams.sortOrder === "ascending")
                return a.createdDate.localeCompare(b.createdDate);
              return b.createdDate.localeCompare(a.createdDate);
            }
          })
          .map((feedback) => {
            return (
              <div key={feedback.id}>
                <Card style={{ marginTop: 16 }}>
                  <Meta
                    avatar={
                      <Space size={12}>
                        <div>
                          {"⭐️"} {feedback.productValuation || "-"}
                        </div>
                        <Avatar src={getImgSrc(feedback.productDetails.nmId)} />
                      </Space>
                    }
                    title={
                      <div className={styles.feedback_header}>
                        {feedback.userName}
                        {"   "}
                        {dayjs(feedback.createdDate).format("YYYY-MM-DD HH:mm")}
                      </div>
                    }
                    description={
                      <>
                        <div className={styles.feedback_header_title}>
                          <span>
                            {feedback.productDetails.productName}{" "}
                            {feedback.productDetails.size}
                          </span>
                          <br />
                          <span>{feedback.productDetails.supplierArticle}</span>
                          <br />
                          <span>
                            {"Поставщик: "}
                            {feedback.productDetails.supplierName}{" "}
                          </span>
                        </div>
                        <div className={styles.feedback_body_text}>
                          {feedback.text}
                        </div>
                        <div className={styles.feedback_body_answer}>
                          {feedback.answer?.text}
                        </div>
                      </>
                    }
                  />
                </Card>
              </div>
            );
          })}
    </Modal>
  );
}

export default Feedbacks;
