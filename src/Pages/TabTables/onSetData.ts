import { OrdersType, SalesType, StocksType, TableStatRowInfoType } from "@/globals";
import { PATH_NAMES } from "@/requestDataHelpers/getCategoriesByDateRange";
import { setCalendarDate } from "@/store";
import { ItemsMap } from ".";

async function onSetData(
    queryParams: {
        fromDate: string;
        toDate: string;
    },
    setData: React.Dispatch<React.SetStateAction<ItemsMap>>,
    requestDataHandler: (pathName: PATH_NAMES,
        queryParams?: {
            fromDate: any;
            toDate: any;

        }) => Promise<Response>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        setIsLoading(true);
        setCalendarDate([queryParams.fromDate, queryParams.toDate])
        const [responseReports, responseOrders, responseStocks] = await Promise.all([requestDataHandler(PATH_NAMES.SALES, queryParams), requestDataHandler(PATH_NAMES.ORDERS, queryParams), requestDataHandler(PATH_NAMES.STOCKS)])
        const sales = await responseReports.json() as SalesType[];
        const orders = await responseOrders.json() as OrdersType[];
        const stocks = await responseStocks.json() as StocksType[];
        if (!sales || !orders || !stocks) return { sales: [], orders: [], stocks: [] };
        setData({ sales, orders, stocks });
        setIsLoading(false);
    }
    catch (e) {
        setIsLoading(false);
        console.log(e)
    }
}

export default onSetData;