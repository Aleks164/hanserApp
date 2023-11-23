import { createEvent, createStore } from "effector";
import { ChosenProductsType, CalendarDateType } from "./StatStoreContext";


export const setChosenProducts = createEvent<ChosenProductsType>();
export const setCalendarDate = createEvent<CalendarDateType>();
export const $chosenProducts = createStore<ChosenProductsType>([""]).on(setChosenProducts, (_, chosenProducts) => chosenProducts);
export const $calendarDate = createStore<CalendarDateType>(["", ""]).on(setCalendarDate, (_, calendarDate) => calendarDate);