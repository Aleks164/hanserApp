import getItemsListByDateRange from "@/requestDataHelpers/getItemsListByDateRange";

type SetDiagramNewItemsListArgsType = {
  startOfRange: string;
  endOfRange: string;
  chosenProducts: string[];
  setIsLoading: (isLoading: boolean) => void;
  setItemsList: (itemsList: Record<string, number>[]) => void;
};

async function setDiagramNewItemsList({
  startOfRange,
  endOfRange,
  chosenProducts,
  setIsLoading,
  setItemsList,
}: SetDiagramNewItemsListArgsType) {
  try {
    setIsLoading(true);
    const newItemsList = await getItemsListByDateRange(
      startOfRange,
      endOfRange,
      chosenProducts
    );
    const parsedNewItemsList = await newItemsList.json();
    if (Array.isArray(parsedNewItemsList)) {
      const formattedItemsList = parsedNewItemsList.map(item => {
        for (const [key, value] of Object.entries(item)) {
          if (Array.isArray(value)) item[key] = value.reduce((prevValue, curValue) => prevValue + curValue, 0)
        }
        return item
      })
      setItemsList(formattedItemsList);
    }
    setIsLoading(false);
  }
  catch (e) {
    console.log(e);
  }
}

export default setDiagramNewItemsList;
