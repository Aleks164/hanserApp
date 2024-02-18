import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Empty,
  Input,
  Row,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import dayjs from "dayjs";

import DataTable from "@/components/DataTable/Index";
import ExcelImporter from "@/components/ExcelImporter";
import { dateFormat } from "@/constants";
import getProductsCards from "@/requestDataHelpers/getProductsCards";
import productCardsColumns from "@/constants/columns/productCards";
import styles from "./styles.module.css";
import { Card } from "../../../commonTypes/cards";
import getImgSrc from "@/constants/getImageSrc";
import TextArea from "antd/es/input/TextArea";

const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;

const characteristicsColumns = [
  {
    title: "Характеристика",
    dataIndex: "name",
  },
  {
    title: "Значение",
    dataIndex: "value",
    render: (value: string[]) => value?.join(", "),
  },
];

function ProductCards() {
  const [tableData, setTableData] = useState<
    { items: Card[]; total: number } | undefined
  >(undefined);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    let isActualRequest = true;
    async function setData() {
      const data = await getProductsCards(searchValue, page);
      if (isActualRequest && data) setTableData(data);
    }
    setData();
    return () => {
      isActualRequest = false;
    };
  }, [searchValue, page]);

  const onRowClick = (card: Card) => {
    setCurrentCard(card);
  };

  const isSelected = (card: Card) => {
    if (!currentCard) return false;
    return card.nmUUID === currentCard.nmUUID;
  };

  const onChangePagination: TableProps<any>["onChange"] = (pagination) => {
    if (pagination.current) setPage(pagination.current);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Row gutter={12} style={{ flexWrap: "nowrap" }}>
        {/* <Row>
          <ExcelImporter
            data={tableData}
            fileName={"_cards_" + dayjs(new Date()).format(dateFormat)}
          />
        </Row> */}
        <Col style={{ minWidth: 500, minHeight: 600 }}>
          <Search
            placeholder="Артикул WB или Код продавца"
            enterButton
            allowClear
            size="large"
            onSearch={(value) => setSearchValue(value)}
          />
          <DataTable
            loading={!tableData}
            itemsList={tableData?.items}
            columns={productCardsColumns}
            style={{ width: 500 }}
            onRowClick={onRowClick}
            isSelected={isSelected}
            isSelectableRow
            onChangePagination={onChangePagination}
            pagination={{
              showSizeChanger: false,
              current: page,
              total: tableData?.total || 1,
            }}
            rowKey="nmUUID"
          />
        </Col>
        <Col className={styles.card_container}>
          {currentCard ? (
            <>
              <Row wrap={false}>
                <Title level={4} underline>
                  {currentCard.title}
                </Title>
              </Row>
              <Space size={12} align="start">
                <div>
                  <Space size={12} align="start">
                    <div style={{ minWidth: 250 }}>
                      <img
                        className={styles.product_photo}
                        src={getImgSrc(currentCard.nmID)}
                        alt={currentCard.brand}
                      />
                    </div>
                    <div>
                      <Space size={12}>
                        <b>{"Код продавца: "}</b>
                        {currentCard.vendorCode}
                      </Space>
                      <Space size={12}>
                        <b>{"Артикул WB: "}</b>
                        {currentCard.nmID}
                      </Space>
                      <div
                        className={styles.common_info_container}
                        style={{ flexDirection: "column" }}
                      >
                        <div className={styles.common_info_container}>
                          <b>Размеры:</b>
                        </div>
                        <div className={styles.common_info_container}>
                          {currentCard.sizes.map((size) => (
                            <div
                              className={styles.size_item}
                              key={size.techSize}
                            >
                              {size.techSize}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Space size={12}>
                        <b>{"Дата создания карточки: "}</b>
                        {dayjs(currentCard.createdAt).format("YYYY.MM.DD")}
                      </Space>
                      <Space size={12}>
                        <b>{"Дата изменения карточки: "}</b>
                        {dayjs(currentCard.updatedAt).format("YYYY.MM.DD")}
                      </Space>
                    </div>
                  </Space>
                  <label>
                    Описание:
                    <TextArea
                      autoSize
                      onChange={(value) =>
                        setCurrentCard((card) => ({
                          ...card!,
                          description: value.target.value,
                        }))
                      }
                      className={styles.product_description}
                      value={currentCard.description}
                    />
                  </label>
                </div>
                <Table
                  className={styles.characteristics_table}
                  dataSource={currentCard.characteristics}
                  pagination={false}
                  columns={characteristicsColumns}
                  rowKey="id"
                />
              </Space>
              <Row justify={"end"} style={{ marginTop: 10 }}>
                <Button onClick={() => setCurrentCard(null)} type="primary">
                  Отмена
                </Button>
                <Button disabled type="primary">
                  Сохранить
                </Button>
              </Row>
            </>
          ) : (
            <Empty
              description="Выберете карточку товара"
              style={{ marginTop: "25%" }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ProductCards;
