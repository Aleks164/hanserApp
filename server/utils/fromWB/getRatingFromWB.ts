import fetch from "node-fetch";
import "dotenv/config";

export interface Rating {

  "valuation": string,
  "feedbacksCount": number,
  "nmId": number,
  "error"?: boolean
}

export interface WBRating {
  data: {
    "valuation": string,
    "feedbacksCount": number,
    "nmId": number
  },
  "error"?: boolean
}

async function getRatingFromWB(nmid: string | number) {
  try {
    const responseJson = await fetch(
      `https://feedbacks-api.wildberries.ru/api/v1/feedbacks/products/rating/nmid?nmId=${nmid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.STANDARD_API as string,
        },
      }
    );
    const salesListFromWB = (await responseJson.json()) as WBRating;
    const valuation = salesListFromWB?.data?.valuation || "";
    const feedbacksCount = salesListFromWB?.data?.feedbacksCount || 0;
    return { valuation, feedbacksCount, nmId: +nmid, error: salesListFromWB.error || false };
  } catch (err) {
    console.log(err);
  }
}

export default getRatingFromWB;
