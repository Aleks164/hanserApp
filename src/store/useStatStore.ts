import { useContext } from "react";
import { StatStoreContext } from "./StatStoreContext";

export function useStatStore() {
    return useContext(StatStoreContext);
}
