import commonEN from '../../locales/commonEN.json';
import commonUA from '../../locales/commonUA.json';

export const LOCALES_MAPPING = {
    en: {
        common: commonEN,
    },
    ua: {
        common: commonUA,
    },
} as const;

export default LOCALES_MAPPING;
