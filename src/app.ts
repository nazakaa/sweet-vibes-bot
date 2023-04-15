import { Markup, Telegraf } from 'telegraf';
import dotenv from 'dotenv';

// init dotenv
dotenv.config();

// create bot
if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');
const bot = new Telegraf(process.env.BOT_TOKEN);

// define event handlers
bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
});

bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});

bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id);
    // Context shortcut
    ctx.leaveChat();
});

bot.command('keyboard', (ctx) => {
    ctx.reply(
        'Keyboard',
        Markup.inlineKeyboard([
            Markup.button.callback('First option', 'first'),
            Markup.button.callback('Second option', 'second'),
        ])
    );
});

bot.on('text', (ctx) => {
    ctx.reply('You choose the ' + (ctx.message.text === 'first' ? 'First' : 'Second') + ' Option!');
});

// launch the bot
bot.launch();

// enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
