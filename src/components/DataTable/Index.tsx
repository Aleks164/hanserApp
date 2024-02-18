import React from "react";
import { Empty, Row, Table } from "antd";
import { ColumnType, TablePaginationConfig, TableProps } from "antd/es/table";
import styles from "./styles.module.css";

interface DataTableParamsType {
  itemsList: Record<string, any>[] | undefined;
  onRowClick?: (record: any, event: React.MouseEvent<any, MouseEvent>) => void;
  columns: ColumnType<any>[];
  loading?: boolean;
  isSelectableRow?: boolean;
  style?: React.CSSProperties | undefined;
  rowKey?: string;
  isSelected?: (record: any) => boolean;
  pagination?: false | TablePaginationConfig | undefined;
  onChangePagination?: TableProps<any>["onChange"];
}

function DataTable({
  itemsList,
  onRowClick,
  isSelected,
  columns,
  isSelectableRow,
  loading,
  rowKey,
  style,
  pagination,
  onChangePagination,
}: DataTableParamsType) {
  return (
    <>
      <Row style={{ marginTop: 10 }}>
        <Table
          showSorterTooltip={false}
          scroll={{ x: true }}
          dataSource={itemsList}
          rowKey={(record) => record._id || (rowKey && record[rowKey])}
          columns={columns}
          loading={loading}
          pagination={pagination}
          onChange={onChangePagination}
          rowClassName={(record: any) => {
            let className = styles.table_row;
            if (isSelected && isSelected(record))
              className += " " + styles.table_selected_row;
            if (isSelectableRow) className += " " + styles.table_selectable_row;
            return className;
          }}
          locale={{
            emptyText: <Empty />,
          }}
          onRow={(record) => {
            return {
              onClick: (event) => {
                if (onRowClick) onRowClick(record, event);
              },
            };
          }}
          style={style}
        />
      </Row>
    </>
  );
}

export default DataTable;
