import { Markup, Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import getTranslatedCompliment from './service/translatedCompliment';
import t from './service/locales';
import { Locale } from './service/locales/types';
import allowDeveloperOnlyDuringDevelopment from './middleware/devonly';
import logger from './service/logger';

const LOCALE: Locale = 'ua';

// initialize environment variables
dotenv.config();

// initialize the bot
if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');
const bot = new Telegraf(process.env.BOT_TOKEN);

// MIDDLEWARE
bot.use(allowDeveloperOnlyDuringDevelopment);

// HANDLERS
bot.start((ctx) => {
    logger.info(`${ctx.from.first_name} started the bot`);

    const welcomeMsg = t(LOCALE, 'common', 'welcome', { who: ctx.from.first_name });
    const iWantCompliment = t(LOCALE, 'common', 'i_want_compliment_button');

    ctx.reply(welcomeMsg, Markup.inlineKeyboard([{ callback_data: 'get_compliment', text: iWantCompliment }]));
});

bot.on('callback_query', async (ctx) => {
    logger.info(`${ctx.from?.first_name ?? 'Someone'} asked for a compliment`);

    if (ctx.callbackQuery) ctx.answerCbQuery();

    const compliment = await getTranslatedCompliment(LOCALE);

    const getAnotherCompliment = t(LOCALE, 'common', 'get_another_compliment_button');

    ctx.reply(compliment, Markup.inlineKeyboard([{ callback_data: 'get_compliment', text: getAnotherCompliment }]));
});

// launch the bot
bot.launch();

bot.catch((err) => {
    logger.error(err);
});

// enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
