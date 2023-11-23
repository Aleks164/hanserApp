import express from "express";
import cors from "cors";
import connectToDB from "./utils/connectToDB";
import updateSupplierStocks from "./controller/updateSupplierStocks";
import updateSupplierOrders from "./controller/updateSupplierOrders";
import updateSupplierSales from "./controller/updateSupplierSales";
import updateSupplierReportDetailByPeriod from "./controller/updateSupplierReportDetailByPeriod";
import ordersByDateRange from "./controller/byDateRange/byBarcode/orders";
import reportDetailsByDateRange from "./controller/byDateRange/byBarcode/reportDetails";
import stocksByDateRange from "./controller/byDateRange/byBarcode/stocks";
import { CronJob } from "cron";
import regularUpdateMongoDB from "./utils/regularUpdateMongoDB";
import https from 'https';
import fs from 'fs';
import path from "path";
import productListByDateRange from "./controller/byDateRange/byBarcode/productList";
import SupplierStocks from "./model/supplierStocks";
import salesByDateRange from "./controller/byDateRange/byBarcode/sales";
import ratingByNmid from "./controller/byDateRange/byBarcode/rating";

const app = express();
const port = 8880;
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
app.use("/products_list", productListByDateRange);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.status(404).send("Sorry, cant find that");
});

// setTimeout(async () => {
//   console.log('startAt:', new Date());
//   await regularUpdateMongoDB();
//   console.log('endAt:', new Date());
// }, 10000)

const job = new CronJob('0 55 6 * * *', async function () {
  console.log('Midnight1:', new Date());
  await regularUpdateMongoDB();
  console.log('Midnight2:', new Date());
});


job.start();

// const server = https.createServer(options, app);

app.listen(port, async () => {
  await connectToDB();
  console.log(`Listening on port ${port}`);
});


