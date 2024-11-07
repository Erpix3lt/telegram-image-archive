/* eslint-disable @typescript-eslint/no-require-imports */
const { Bot } = require("grammy");

const bot = new Bot(""); 
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));
bot.start();