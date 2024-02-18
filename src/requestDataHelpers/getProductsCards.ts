import { HOST_NAME } from "@/constants";
import { Card } from "../../commonTypes/cards";

async function getProductsCards(searchValue: string, page: number): Promise<{ items: Card[], total: number } | undefined> {
    try {
        const result = await fetch(`${HOST_NAME}/cards?searchValue=${searchValue}&page=${page}`, {
            method: "GET",
        })
        return await result.json()
    } catch (e) {
        console.log(e)
    }

}

export default getProductsCards;