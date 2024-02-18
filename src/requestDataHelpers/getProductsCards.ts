import { HOST_NAME } from "@/constants";

async function getProductsCards(searchValue: string, page: number) {
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