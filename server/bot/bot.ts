import { Telegraf } from "telegraf";
import getCoefficients, { WarehousesCoefficients } from "./getCoefficients";
import "dotenv/config";
import { warehouses } from "./warehouses";

interface WarehousesById {
  [warehouseId: number]: WarehousesCoefficients;
}

const key = process.env.BOT_TOKEN as string;
const targetId = process.env.HANSTER_ID as string;
const myId = process.env.MY_ID as string;
const timeInterval = 1000 * 20; // 20 second

let prevCheck: WarehousesById = {};
let currentCheck: WarehousesById = {};
let checkSummary = "";
const warehousesIds = Object.keys(warehouses);
let lastCheckTime = "";
let isCheckRunning = true;
let timeOutId: any;

const helpMessage =
  "Основные комманды:\n/start - начать проверку\n/lastCheck - последний результат\n/stop - остановить проверку\n/help - Основные комманды";

export const startBot = () => {
  const bot = new Telegraf(key);
  const ids = [targetId, myId];

  bot.start((ctx) => {
    console.log(ctx.update.message.from);
    const id = ctx.update.message.from.id;
    if (!ids.includes(String(id))) ids.push(String(id));
    return ctx.reply(helpMessage);
  });
  bot.launch();

  const tryCheck = async () => {
    const warehousesCoef = await getCoefficients(warehousesIds);
    lastCheckTime = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });
    let errors = "";
    const newMap = warehousesCoef.reduce((acc: any, curr: any) => {
      acc[curr.warehouseID] = curr;
      return acc;
    }, {});

    if (!Object.keys(prevCheck).length) prevCheck = newMap;
    currentCheck = newMap;

    for (const key in currentCheck) {
      if (prevCheck[key].coefficient !== currentCheck[key].coefficient) {
        errors += `Коэффициент склада ${currentCheck[key].warehouseName} был изменен ${prevCheck[key].coefficient} на ${currentCheck[key].coefficient}.\n`;
      }
    }

    checkSummary = Object.values(currentCheck).reduce((acc: any, curr: any) => {
      acc += `${curr.warehouseName} - ${curr.coefficient}\n`;
      return acc;
    }, "");
    if (errors) {
      ids.forEach((id) => bot.telegram.sendMessage(id, errors));
    }
    await new Promise((resolve) => setTimeout(resolve, timeInterval));
    if (isCheckRunning) tryCheck();
  };

  tryCheck();

  bot.on("message", (ctx: any) => {
    bot.telegram.sendMessage(
      myId,
      ctx.update.message.from.username ||
        ctx.update.message.from.first_name + " : " + ctx.update.message.text
    );
    switch (ctx.update.message.text) {
      case "/start": {
        if (isCheckRunning) return ctx.reply("Bot is already running");
        isCheckRunning = true;

        return ctx.reply("Bot started");
      }
      case "/stop": {
        clearTimeout(timeOutId);
        isCheckRunning = false;
        return ctx.reply("Bot stopped");
      }
      case "/lastCheck": {
        return ctx.reply(
          checkSummary
            ? lastCheckTime + "\n" + checkSummary
            : "wait for the result..., check later"
        );
      }
      case "/help": {
        return ctx.reply(helpMessage);
      }
      default: {
        return ctx.reply("Unknown command");
      }
    }
  });

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
