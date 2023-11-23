import React, { useState } from "react";
import {
  ChosenProductsType,
  CalendarDateType,
  StatStoreContext,
} from "./StatStoreContext";

export const StatStoreProvider = ({ children }: React.PropsWithChildren) => {
  const [chosenProducts, setChosenProducts] = useState<ChosenProductsType>([]);
  const [calendarDate, setCalendarDate] = useState<CalendarDateType>(["", ""]);

  const statStoreKit = {
    chosenProducts,
    calendarDate,
    setChosenProducts,
    setCalendarDate,
  };

  return (
    <StatStoreContext.Provider value={statStoreKit}>
      {children}
    </StatStoreContext.Provider>
  );
};
