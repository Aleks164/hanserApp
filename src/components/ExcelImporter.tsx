import React from "react";
import { Button, Tooltip } from "antd";
import Icon from "@ant-design/icons";
import ExcelIcon from "@/assets/excel.svg";

const HeartIcon = () => (
  <Tooltip title={"Экспорт в Excel"} placement="right">
    <img style={{ height: "28px", width: "28px" }} src={ExcelIcon} />
  </Tooltip>
);

const ExcelImporter = ({
  data,
  fileName,
}: {
  data: Record<string, any>[];
  fileName: string;
}) => {
  function exportHandler() {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
  }

  return (
    <Button
      onClick={exportHandler}
      title="Экспорт в Excel"
      icon={<Icon component={HeartIcon} />}
    />
  );
};

export default ExcelImporter;
