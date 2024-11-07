/* eslint-disable @typescript-eslint/no-require-imports */
import { Bot } from "grammy";
import { config } from "dotenv";

config({ path: ".env.local" });

const token = process.env.NEXT_PUBLIC_BOT_TOKEN;
if (!token) {
    throw new Error("Bot token is missing in .env.local");
}

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
