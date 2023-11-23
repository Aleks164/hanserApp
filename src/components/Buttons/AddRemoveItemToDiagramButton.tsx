import React from "react";
import { Tooltip, Button } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { GetReportColumnArgsType } from "@/constants/columns/getDiagramPageTableColumns";
import { setChosenProducts } from "@/store";

interface AddRemoveItemToDiagramButtonParamsType
  extends GetReportColumnArgsType {
  value: string;
}

function AddRemoveItemToDiagramButton({
  chosenProducts,
  value,
}: AddRemoveItemToDiagramButtonParamsType) {
  const isProductChosen = chosenProducts.includes(value);
  const onToggle = () => {
    if (isProductChosen) {
      const newChosenItems = chosenProducts.filter((item) => item !== value);
      setChosenProducts(newChosenItems);
    } else {
      const newChosenItems = chosenProducts.concat(value);
      setChosenProducts(newChosenItems);
    }
  };
  return (
    <div className={styles.toggle_button_container}>
      <Tooltip
        title={isProductChosen ? "Удалить с графика" : "Добавить на график"}
      >
        <Button
          onClick={onToggle}
          className={styles.toggle_button}
          icon={
            isProductChosen ? (
              <MinusCircleOutlined style={{ color: "red" }} />
            ) : (
              <PlusCircleOutlined style={{ color: "green" }} />
            )
          }
        />
      </Tooltip>
      <div>{value}</div>
    </div>
  );
}

export default AddRemoveItemToDiagramButton;
