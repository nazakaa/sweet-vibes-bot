import { Markup, Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import getTranslatedCompliment from './service/translatedCompliment';
import { isDev } from './utils/env';
import getLocalizedText from './service/localePicker';

// initialize environment variables
dotenv.config();

// initialize the bot
if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');
const bot = new Telegraf(process.env.BOT_TOKEN);

// HANDLERS

bot.use(async (ctx, next) => {
    // blocks all users except the developer if environment is development
    if (!isDev) return next();

    if (!process.env.DEVELOPER_TELEGRAM_ID) throw new Error('DEVELOPER_TELEGRAM_ID is not defined');
    if (ctx.from?.id === parseInt(process.env.DEVELOPER_TELEGRAM_ID)) return next();
    console.log(`${ctx.from?.first_name ?? 'Someone'} tried to use the bot during development but was not allowed`);
});

bot.start((ctx) => {
    console.log(`${ctx.from.first_name} started the bot`);

    const welcomeMsg = getLocalizedText('en', 'common')('welcome', { replace: { who: ctx.from.first_name } });
    const iWantCompliment = getLocalizedText('en', 'common')('i_want_compliment_button');

    ctx.reply(welcomeMsg, Markup.inlineKeyboard([{ callback_data: 'get_compliment', text: iWantCompliment }]));
});

bot.on('callback_query', async (ctx) => {
    console.log(`${ctx.from?.first_name ?? 'Someone'} asked for a compliment`);

    if (ctx.callbackQuery) ctx.answerCbQuery();

    const compliment = await getTranslatedCompliment('EN');

    const getAnotherCompliment = getLocalizedText('en', 'common')('get_another_compliment_button');

    ctx.reply(compliment, Markup.inlineKeyboard([{ callback_data: 'get_compliment', text: getAnotherCompliment }]));
});

// launch the bot
bot.launch();

bot.catch((err) => console.error(err));

// enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
