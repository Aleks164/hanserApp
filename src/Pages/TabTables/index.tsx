import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Button, Card, Modal, Row, Tooltip } from "antd";
import DataTable from "@/components/DataTable/Index";
import DatePiker from "@/components/DatePicker/DatePiker";
import ExcelImporter from "@/components/ExcelImporter";
import CurrentDate from "./CurrentDate";
import getCategoriesByDateRange from "@/requestDataHelpers/getCategoriesByDateRange";
import onSetData, { TableStatRowInfoType } from "./onSetData";
import { getColumns } from "@/constants/columns/getColumns";
import { dateFormat } from "@/constants";
import dayjs from "dayjs";
import { $chosenProducts, $calendarDate } from "@/store";
import { useStore } from "effector-react";
import getRatingByNmId, {
  RATING_PATH_NAMES,
} from "@/requestDataHelpers/getRatingByNmId";
import { DiffOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import getFeedbacksByNmId, {
  FEEDBACK_PATH_NAMES,
  Feedback,
  FeedbackData,
} from "@/requestDataHelpers/getFeedbacksByNmId";
import getImgSrc from "@/constants/getImageSrc";
import Meta from "antd/es/card/Meta";

export interface Rating {
  valuation: string;
  feedbacksCount: number;
  nmId: number;
}

export interface PageParams {
  current: number;
  pageSize: number;
  field: React.Key;
  order: string;
  currentDataSource: Record<string, any>[];
}

export interface FeedbacksParams {
  visible?: boolean;
  nmid?: number;
  isAnswered?: boolean;
  data?: Feedback[];
}

function TabTables() {
  const [itemsList, setItemsList] = useState<TableStatRowInfoType[]>([]);
  const [isStockFilterOn, setIsStockFilterOn] = useState(false);
  const [feedbacksParams, setFeedbacksParams] = useState<FeedbacksParams>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageParams, setCurrentPageParams] = useState<PageParams>(
    {} as PageParams
  );
  const [ratingMap, setRatingMap] = useState<
    Record<string, { feedbacksCount: number; valuation: string }>
  >({});

  const chosenProducts = useStore($chosenProducts);
  const [firstDate, secondDate] = useStore($calendarDate);
  const onSetDataHandler = useCallback(
    (fromDate: string, toDate: string) =>
      onSetData(
        { fromDate, toDate },
        setItemsList,
        getCategoriesByDateRange,
        setIsLoading
      ),
    []
  );

  useEffect(() => {
    if (!feedbacksParams.visible || !feedbacksParams.nmid) return;
    async function getFeedbacks() {
      const feedback = await getFeedbacksByNmId(
        FEEDBACK_PATH_NAMES.FEEDBACK,
        feedbacksParams.nmid!,
        true
        // !!feedbacksParams.isAnswered
      );
      const parsedFeedbacks = (await feedback.json()) as FeedbackData;
      if (feedbacksParams.visible)
        setFeedbacksParams((prevState) => ({
          ...prevState,
          data: parsedFeedbacks?.data?.feedbacks || [],
        }));
    }
    try {
      getFeedbacks();
    } catch (e) {
      console.log(e);
    }
  }, [
    feedbacksParams.isAnswered,
    feedbacksParams.visible,
    feedbacksParams.nmid,
  ]);

  useEffect(() => {
    let { pageSize, currentDataSource, current } = currentPageParams;
    if (!currentDataSource && !itemsList.length) return;
    if (!currentDataSource && itemsList.length) {
      current = 1;
      pageSize = 10;
      currentDataSource = itemsList;
    }

    currentDataSource = currentDataSource.slice(
      (current - 1) * pageSize,
      pageSize * current
    );

    const newRatingMap: Record<string, string> = {};
    currentDataSource.forEach((el) => {
      if (el.nmId) newRatingMap[el.nmId] = el.nmId;
    });
    async function getRating() {
      const nmidAsString = Object.keys(newRatingMap).join(",");
      const ratingItems = await getRatingByNmId(
        RATING_PATH_NAMES.RATING,
        nmidAsString
      );
      const parsedItems = await ratingItems.json();
      setRatingMap(parsedItems);
    }
    getRating();
  }, [itemsList, currentPageParams]);

  return (
    <div style={{ marginTop: 10 }}>
      <Row>
        <DatePiker onSetData={onSetDataHandler} />
        <CurrentDate firstDate={firstDate} secondDate={secondDate} />
        <Row className={styles.button_container}>
          <ExcelImporter
            data={itemsList}
            fileName={dayjs(new Date()).format(dateFormat)}
          />
          <Tooltip
            title={"Убрать склад без заказов и продаж за текущий период"}
            placement="right"
          >
            <Button disabled type="primary" icon={<DiffOutlined />} />
          </Tooltip>
        </Row>
        <DataTable
          itemsList={itemsList}
          setCurrentPageParams={setCurrentPageParams}
          columns={getColumns({
            chosenProducts,
            rating: ratingMap,
            setFeedbacksParams,
          })}
          loading={isLoading}
        />
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
                          <Avatar
                            src={getImgSrc(feedback.productDetails.nmId)}
                          />
                        }
                        title={
                          <div className={styles.feedback_header}>
                            {feedback.userName}
                            {"   "}
                            {dayjs(feedback.createdDate).format(
                              "YYYY-MM-DD HH:mm"
                            )}
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
                              <span>
                                {feedback.productDetails.supplierArticle}
                              </span>
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
      </Row>
    </div>
  );
}

export default TabTables;
