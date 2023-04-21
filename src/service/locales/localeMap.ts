import commonEN from '../../locales/commonEN.json';
import commonUA from '../../locales/commonUA.json';

export const LOCALE_MAP = {
    en: {
        common: commonEN,
    },
    ua: {
        common: commonUA,
    },
} as const;

export default LOCALE_MAP;
