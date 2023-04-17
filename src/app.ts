import { Markup, Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import getCompliment from './service/complimentr-api';

// initialize environment variables
dotenv.config();

// initialize the bot
if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');
const bot = new Telegraf(process.env.BOT_TOKEN);

// HANDLERS
bot.start((ctx) => {
    ctx.reply(
        `Hi ${ctx.from.first_name}! Would you like getting a compliment?`,
        Markup.inlineKeyboard([{ callback_data: 'get_compliment', text: 'Yes pleeese!' }])
    );
});

bot.on('callback_query', async (ctx) => {
    if (ctx.callbackQuery) ctx.answerCbQuery();

    const compliment = await getCompliment();
    ctx.reply(compliment, Markup.inlineKeyboard([{ callback_data: 'get_compliment', text: 'Get another one' }]));
});

// launch the bot
bot.launch();

// enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
