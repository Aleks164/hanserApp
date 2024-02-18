import fetch from "node-fetch";
import "dotenv/config";
import { Cursor } from "../../../commonTypes/cards";



async function getProductCardsFromWB(data: any) {
    try {
        const responseJson = await fetch(
            `https://suppliers-api.wildberries.ru/content/v2/get/cards/list`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.CONTENT_API as string,
                },
                body: JSON.stringify(data)
            }
        );
        const feedbacksFromWB = (await responseJson.json()) as any;
        return feedbacksFromWB;
    } catch (err) {
        console.log(err);
    }
}

export default getProductCardsFromWB;