import express from "express";
import getProductCardsFromWB from "../utils/fromWB/getProductCardsFromWB";
import { Card, CardsListRequest } from "../../commonTypes/cards";
import DBRequestCache from "../utils/cache";

const productCards = express.Router();

const requestCardData = {
    "settings": {
        "cursor": {
            "limit": 1000
        },
        "filter": {
            "withPhoto": -1
        }
    }
}

async function getFullListOfCards(requestData: any, list?: Card[]) {
    const fullList: Card[] = list || [];

    const cards = await getProductCardsFromWB(requestData) as CardsListRequest;
    await new Promise(res => setTimeout(() => {
        res(null);
    }, 1000));
    fullList.push(...cards.cards);
    if (cards.cursor.total === 1000) await getFullListOfCards({ settings: { ...requestCardData.settings, cursor: { ...cards.cursor, limit: 1000 } } }, fullList)
    return fullList;
}

productCards.get("/", async (req, res, next) => {
    try {
        let cards: Card[] | undefined = DBRequestCache.get('productCards');
        if (!cards) {
            cards = await getFullListOfCards(requestCardData);
            DBRequestCache.set('productCards', cards);
        }
        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json(cards);
    } catch (e) {
        console.log(e)
        res.status(400).json("Bad request");
    }
});

export default productCards;
