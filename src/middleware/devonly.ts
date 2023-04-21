import { Middleware, Context } from 'telegraf';
import { isDev } from '../utils/env';
import logger from '../service/logger';

/**
 * Restricts access to the bot to the developer only during development

 * If `env:ENVIRONMENT=development` block all users except the developer(specified by `env:DEVELOPER_TELEGRAM_ID`), otherwise do nothing
 */
export const allowDeveloperOnlyDuringDevelopment: Middleware<Context> = async (ctx, next) => {
    if (!isDev) return next();

    if (!process.env.DEVELOPER_TELEGRAM_ID) throw new Error('DEVELOPER_TELEGRAM_ID is not defined');
    if (ctx.from?.id === parseInt(process.env.DEVELOPER_TELEGRAM_ID)) return next();

    logger.info(`${ctx.from?.first_name ?? 'Someone'} tried to use the bot during development but was not allowed`);
};

export default allowDeveloperOnlyDuringDevelopment;
