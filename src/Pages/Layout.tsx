import React, { useState } from "react";
import { DatabaseOutlined, LineChartOutlined } from "@ant-design/icons";
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
    label: <Link to="diagrams/">Графики</Link>,
    key: "diagrams",
    icon: <LineChartOutlined />,
    title: "В разработке",
  },
];

const Layout: React.FC = () => {
  const [current, setCurrent] = useState("statistics");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Row>
        <Col flex={4}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Col>
        <Col className={styles.logo_container} flex={1}>
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
