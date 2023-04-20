import { LOCALES_MAPPING } from './localesMapping';

export type Locale = keyof typeof LOCALES_MAPPING;
export type Namespace = keyof (typeof LOCALES_MAPPING)[Locale];
