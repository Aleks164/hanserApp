import express from "express";
import getProductCardsFromWB from "../utils/fromWB/getProductCardsFromWB";
import { Card, CardsListRequest } from "../../commonTypes/cards";
import DBRequestCache from "../utils/cache";
import fs from "fs";

const productCards = express.Router();

const requestCardData = {
    "settings": {
        "cursor": {
            "limit": 100
        },
        "filter": {
            "withPhoto": -1
        }
    }
}

const pageSize = 10;

async function getFullListOfCards(requestData: any, list?: Card[]): Promise<any> {
    const fullList: Card[] = list || [];

    const cards = await getProductCardsFromWB(requestData) as CardsListRequest;
    await new Promise(res => setTimeout(() => {
        res(null);
    }, 2000));
    fullList.push(...cards.cards);
    console.log("!fullList", cards.cursor)
    if (cards.cursor.total === 100) return await getFullListOfCards({ settings: { ...requestCardData.settings, cursor: { ...cards.cursor, limit: 100 } } }, fullList)
    return fullList;
}

productCards.get("/", async (req, res, next) => {
    try {
        const searchValue = req.query["searchValue"] as string;
        const page = Number(req.query["page"]) || 1 as number;
        // let cards: Card[] | undefined = DBRequestCache.get('productCards');
        // if (!cards) {
        const cards = await getFullListOfCards(requestCardData);
        // DBRequestCache.set('productCards', cards);
        // }
        const filterFieldName = !isNaN(+searchValue) ? 'nmID' : "vendorCode";
        const filteredCards = cards.filter((card: any) => card[filterFieldName].toString().includes(searchValue))
        const cardsPage = filteredCards.slice((page - 1) * pageSize, (page) * pageSize);
        const total = Math.ceil(filteredCards.length / pageSize);
        var json = JSON.stringify(cards);
        fs.writeFile('total.json', json, 'utf8', () => console.log('saved total'));
        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json({ items: cardsPage, total });
    } catch (e) {
        console.log(e)
        res.status(400).json("Bad request");
    }
});

export default productCards;
