import React from "react";
import { Empty, Row, Table } from "antd";
import { ColumnType } from "antd/es/table";
import styles from "./styles.module.css";

interface DataTableParamsType {
  itemsList: Record<string, any>[];
  columns: ColumnType<any>[];
  loading: boolean;
}

function DataTable({ itemsList, columns, loading }: DataTableParamsType) {
  return (
    <>
      <Row style={{ marginTop: 10 }}>
        <Table
          showSorterTooltip={false}
          scroll={{ x: true }}
          dataSource={itemsList}
          rowKey={(record) => record._id}
          columns={columns}
          loading={loading}
          rowClassName={styles.table_row}
          locale={{ emptyText: <Empty /> }}
        />
      </Row>
    </>
  );
}

export default DataTable;
