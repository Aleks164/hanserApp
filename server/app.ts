import express from "express";
import cors from "cors";
import connectToDB from "./utils/connectToDB";
import ordersByDateRange from "./controller/byDateRange/byBarcode/orders";
import reportDetailsByDateRange from "./controller/byDateRange/byBarcode/reportDetails";
import stocksByDateRange from "./controller/byDateRange/byBarcode/stocks";
import { CronJob } from "cron";
import regularUpdateMongoDB from "./utils/regularUpdateMongoDB";
import productListByDateRange from "./controller/byDateRange/byBarcode/productList";
import salesByDateRange from "./controller/byDateRange/byBarcode/sales";
import ratingByNmid from "./controller/byDateRange/byBarcode/rating";
import feedbacksByNmid from "./controller/byDateRange/byBarcode/feedback";
import statisticsByDateRange from "./controller/byDateRange/statistics";
import DBRequestCache from "./utils/cache";
import updateMissingRatings from "./utils/updateMissingRatings";

const app = express();
const port = 80;
// const key = fs.readFileSync('/etc/letsencrypt/live/hansterstatserver.ru/privkey.pem');
// const cert = fs.readFileSync('/etc/letsencrypt/live/hansterstatserver.ru/fullchain.pem');
// const options = {
// key: key,
// cert: cert
// };

app.use(cors());
app.use("/orders", ordersByDateRange);
app.use("/stocks", stocksByDateRange);
app.use("/sales", salesByDateRange);
app.use("/reports", reportDetailsByDateRange);
app.use("/rating", ratingByNmid);
app.use("/feedback", feedbacksByNmid);
app.use("/productsList", productListByDateRange);
app.use("/statistics", statisticsByDateRange);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.status(404).send("Sorry, cant find that");
});

const regularUpdateMongoDBJob = new CronJob('0 45 6 * * *', async function () {
  console.log('start', new Date());
  DBRequestCache.flushAll();
  await regularUpdateMongoDB();
  console.log('end', new Date());
});

const updateMissingRatingsJob = new CronJob('0 55 6 * * *', async function () {
  console.log('start', new Date());
  await updateMissingRatings();
  console.log('end', new Date());
});

regularUpdateMongoDBJob.start();
updateMissingRatingsJob.start();

// const server = https.createServer(options, app);

app.listen(port, async () => {
  await connectToDB();
  console.log(`Listening on port ${port}`);
});

