import { Bot } from 'grammy';

export const bot = new Bot(process.env.NEXT_PUBLIC_BOT_TOKEN || "");
