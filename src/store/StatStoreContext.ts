import { createContext } from "react";

export type ChosenProductsType = string[];
export type CalendarDateType = [string, string];
export type SetCalendarDateType = React.Dispatch<React.SetStateAction<CalendarDateType>>;
export type SetChosenProductsType = React.Dispatch<React.SetStateAction<ChosenProductsType>>;

interface StatStorePropsType {
    chosenProducts: ChosenProductsType,
    calendarDate: CalendarDateType,
    setChosenProducts: SetChosenProductsType,
    setCalendarDate: SetCalendarDateType,
}

export const StatStoreContext = createContext<StatStorePropsType>({
    chosenProducts: [],
    calendarDate: ["", ""],
    setChosenProducts: () => { },
    setCalendarDate: () => { },
});