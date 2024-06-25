// import total from "./total.json";
// import { read, writeFileXLSX } from "xlsx";
var XLSX = require("xlsx");
var total = require("./total.json");
var fetch = require("node-fetch");
require("dotenv/config");

var workbook = XLSX.readFile("description.xlsx");
const book = workbook.Sheets["Sheet1"];

async function updateProductCardsOnWB(data) {
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  try {
    const responseJson = await fetch(
      `https://suppliers-api.wildberries.ru/content/v2/cards/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.CONTENT_API,
        },
        body: jsonData,
      }
    );
    const feedbacksFromWB = await responseJson.json();
    return feedbacksFromWB;
  } catch (err) {
    console.log(err);
  }
}

// book.forEach((element, index) => {
//   const nmid = book[`A${index + 1}`].v;
//   console.log(nmid, element);
// });

// for (z in book) {
//   console.log(z);
// }
let isClear = true;
let errorItem = {};
async function doUpdate() {
  const result = [];
  let sameTitle = 0;
  for (let index = 2; index < 101; index++) {
    const nmid = book[`A${index}`].v;
    const totalItem = total.find((el) => el.nmID === +nmid);
    if (!nmid || !totalItem) continue;

    const {
      imtID,
      nmUUID,
      subjectID,
      subjectName,
      createdAt,
      updatedAt,
      photos,
      ...data
    } = totalItem;
    const title = book[`C${index}`].v;
    if (title === totalItem.title) {
      sameTitle++;
      continue;
    }
    data.title = title;
    result.push(data);
  }
  const response = await updateProductCardsOnWB(result);
  console.log(response);
  console.log(124, sameTitle, result.length);
}
doUpdate();

// const nmid = book["A1"].v;
// const vendorId = book["B1"].v;
// const description = book["C1"].v;
// const totalItem = total.find((el) => el.nmID === +nmid);
// const isEqual = totalItem.vendorCode === vendorId;
// const a = read("description.xlsx");
// console.log(totalItem, vendorId, isEqual);
// console.log(a);
// XLSX.writeFile(workbook, filename, opts);

//  for (let index = 1; index < 5; index++) {
//    const nmid = book[`A${index}`].v;
//    const totalItem = total.find((el) => el.nmID === +nmid);
//    const {
//      imtID,
//      nmUUID,
//      subjectID,
//      subjectName,
//      createdAt,
//      updatedAt,
//      photos,
//      ...data
//    } = totalItem;
//    const description = book[`C${index}`].v;
//    data.description = description;
//  }
