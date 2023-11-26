import React, { useRef } from "react";
import { Empty, Row, Table } from "antd";
import { ColumnType } from "antd/es/table";
import styles from "./styles.module.css";

interface DataTableParamsType {
  itemsList: Record<string, any>[];
  columns: ColumnType<Required<any>>[];
  loading: boolean;
  setCurrentPage?: (page: number) => void;
}

function DataTable({
  itemsList,
  columns,
  loading,
  setCurrentPage,
}: DataTableParamsType) {
  return (
    <>
      <Row>
        <Table
          showSorterTooltip={false}
          scroll={{ x: true }}
          dataSource={itemsList}
          rowKey={(record) => record._id}
          columns={columns}
          loading={loading}
          pagination={{
            onChange: (page: number, pageSize: number) => {
              if (setCurrentPage) setCurrentPage(page);
            },
          }}
          rowClassName={styles.table_row}
          locale={{ emptyText: <Empty /> }}
        />
      </Row>
    </>
  );
}

export default DataTable;
