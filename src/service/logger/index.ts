import winston, { createLogger, format, transports } from 'winston';
// import TelegramTransport from 'winston-telegram';
import dotenv from 'dotenv';
import { isProd } from '../../utils/env';

// initialize environment variables
dotenv.config();

export const logger = createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.errors({ stack: true }),
                format.align(),
                format.printf((info) => {
                    if (isProd) return `${info.timestamp} ${info.level}: ${info.message}`;
                    return `${info.level}: ${info.message}`;
                })
            ),
        }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
        // new TelegramTransport({
        //     level: 'error', // send only error logs to Telegram
        //     token: 'YOUR_BOT_TOKEN',
        //     chatId: 1212,
        // }),
    ],
});

export default logger;
