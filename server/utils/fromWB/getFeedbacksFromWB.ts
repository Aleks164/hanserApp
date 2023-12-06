import fetch from "node-fetch";
import "dotenv/config";

export type Feedback = Record<string, any>


async function getFeedbacksFromWB(nmid: string, isAnswered: string) {
  try {
    const responseJson = await fetch(
      `https://feedbacks-api.wildberries.ru/api/v1/feedbacks?isAnswered=${isAnswered}&nmId=${nmid}&take=${500}&skip=${0}&order=dateDesc&`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.STANDARD_API as string,
        },
      }
    );
    const feedbacksFromWB = (await responseJson.json()) as Feedback;
    return feedbacksFromWB;
  } catch (err) {
    console.log(err);
  }
}

export default getFeedbacksFromWB;
