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
import productCards from "./controller/productCards";
import cookieParser from 'cookie-parser';


const app = express();
const port = 80;
const userCounter = 0;
// const key = fs.readFileSync('/etc/letsencrypt/live/hansterstatserver.ru/privkey.pem');
// const cert = fs.readFileSync('/etc/letsencrypt/live/hansterstatserver.ru/fullchain.pem');
// const options = {
// key: key,
// cert: cert
// };
console.log(1, process.env.npm_config_mode === "dev")

// app.use(cookieParser());
// app.use(express.json());
// app.use(cors({
//   origin: process.env.npm_config_mode === "dev" ? 'http://localhost:8080' : 'http://81.31.247.81:80',
//   credentials: true,
// }));
app.use(cors());

// app.get("*", (req, res) => {
//   res.cookie('user', 'JohnDoe');
//   res.status(404).send("Sorry, cant find that");
// });

app.use("/orders", ordersByDateRange);
app.use("/stocks", stocksByDateRange);
app.use("/sales", salesByDateRange);
app.use("/reports", reportDetailsByDateRange);
app.use("/rating", ratingByNmid);
app.use("/feedback", feedbacksByNmid);
app.use("/productsList", productListByDateRange);
app.use("/statistics", statisticsByDateRange);

app.use("/cards", productCards);


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

