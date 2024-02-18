import React, { useEffect, useState } from "react";
import {
  DatabaseOutlined,
  FormOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Col, Menu, Row } from "antd";
import type { MenuProps } from "antd";
import hanster from "@/assets/hanster.jpg";
import styles from "./styles.module.css";

const items: MenuProps["items"] = [
  {
    label: <Link to="/">Статистика</Link>,
    key: "statistics",
    icon: <DatabaseOutlined />,
  },
  {
    label: <Link to="/cards">Номенклатура</Link>,
    key: "cards",
    icon: <FormOutlined />,
  },
  {
    label: (
      <Link
        style={{ cursor: "not-allowed" }}
        onClick={(e) => e.preventDefault()}
        to="diagrams/"
      >
        Графики
      </Link>
    ),
    key: "diagrams",
    icon: <LineChartOutlined />,
    title: "В разработке",
    disabled: true,
  },
];

const Layout: React.FC = () => {
  const [current, setCurrent] = useState("statistics");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (location.pathname.includes("cards")) setCurrent("cards");
  }, []);

  return (
    <>
      <Row>
        <Col flex={1}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ boxShadow: "#5b5b5b 1px 1px 3px 2px" }}
          />
        </Col>
        <Col className={styles.logo_container}>
          <NavLink
            to={"https://www.wildberries.ru/brands/hanster"}
            target="_blank"
          >
            <img className={styles.logo} src={hanster} alt="hanster" />
          </NavLink>
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default Layout;
