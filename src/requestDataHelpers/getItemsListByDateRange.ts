import { HOST_NAME } from "@/constants";

function getItemsListByDateRange(fromDate: string, toDate: string, barcods: string[]) {
    return fetch(`${HOST_NAME}/products_list?fromDate=${fromDate}&toDate=${toDate}&barcods=${barcods}`, {
        method: "GET",
    })
}

export default getItemsListByDateRange;