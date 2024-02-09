import React from "react";
import { Modal, Card, Avatar } from "antd";
import Meta from "antd/es/card/Meta";
import dayjs from "dayjs";
import getImgSrc from "@/constants/getImageSrc";
import styles from "./styles.module.css";

import { FeedbacksParams } from ".";

interface FeedbacksProps {
  feedbacksParams: FeedbacksParams;
  setFeedbacksParams: React.Dispatch<React.SetStateAction<FeedbacksParams>>;
}

function Feedbacks({ feedbacksParams, setFeedbacksParams }: FeedbacksProps) {
  return (
    <Modal
      open={feedbacksParams.visible}
      title="Отзывы"
      cancelText="Закрыть"
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() =>
        setFeedbacksParams((prevState) => ({
          ...prevState,
          visible: false,
        }))
      }
    >
      {feedbacksParams.data &&
        feedbacksParams.data
          .filter((feedback) => feedback.text)
          .map((feedback) => {
            return (
              <div key={feedback.id}>
                <Card style={{ marginTop: 16 }}>
                  <Meta
                    avatar={
                      <Avatar src={getImgSrc(feedback.productDetails.nmId)} />
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
