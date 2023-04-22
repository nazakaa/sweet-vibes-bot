/**
 * @returns {boolean} true if the environment is production
 */
export const isProd = process.env.ENVIRONMENT === 'production';

/**
 * @returns {boolean} true if the environment is development
 */
export const isDev = process.env.ENVIRONMENT === 'development';
