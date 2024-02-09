import { HOST_NAME } from "@/constants";

function getItemsListByDateRange(fromDate: string, toDate: string, barcods: string[]) {
    return fetch(`${HOST_NAME}/productsList?fromDate=${fromDate}&toDate=${toDate}&barcods=${barcods}`, {
        method: "GET",
    })
}

export default getItemsListByDateRange;