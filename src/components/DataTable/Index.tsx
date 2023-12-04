import React, { useRef } from "react";
import { Empty, Row, Table } from "antd";
import { ColumnType, TablePaginationConfig } from "antd/es/table";
import styles from "./styles.module.css";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { PageParams } from "@/Pages/TabTables";

interface DataTableParamsType {
  itemsList: Record<string, any>[];
  columns: ColumnType<Required<any>>[];
  loading: boolean;
  setCurrentPageParams?: React.Dispatch<React.SetStateAction<PageParams>>;
}

function DataTable({
  itemsList,
  columns,
  loading,
  setCurrentPageParams,
}: DataTableParamsType) {
  return (
    <>
      <Row style={{ marginTop: 10 }}>
        <Table
          showSorterTooltip={false}
          scroll={{ x: true }}
          dataSource={itemsList}
          rowKey={(record) => record._id}
          columns={columns}
          onChange={(
            pagination: TablePaginationConfig,
            filters: Record<string, FilterValue | null>,
            sorter: SorterResult<Record<string, any>>,
            extra: TableCurrentDataSource<Record<string, any>>
          ) => {
            const { current = 1, pageSize = 10 } = pagination;
            const { field = "", order = "" } = sorter;
            const { currentDataSource = [] } = extra;
            console.log(current, pageSize, field, order, currentDataSource);
            if (setCurrentPageParams)
              setCurrentPageParams({
                current,
                pageSize,
                field,
                order,
                currentDataSource,
              });
          }}
          loading={loading}
          rowClassName={styles.table_row}
          locale={{ emptyText: <Empty /> }}
        />
      </Row>
    </>
  );
}

export default DataTable;
