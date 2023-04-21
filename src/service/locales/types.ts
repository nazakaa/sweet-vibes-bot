import { LOCALE_MAP } from './localeMap';

export type Locale = keyof typeof LOCALE_MAP;
export type Namespace = keyof (typeof LOCALE_MAP)[Locale];

type PathInto<T extends Record<string, any>> = keyof {
    [K in keyof T as T[K] extends string
        ? K
        : T[K] extends Record<string, any>
        ? `${K & string}.${PathInto<T[K]> & string}`
        : never]: any;
};

export type FullLocaleKeyPath = PathInto<(typeof LOCALE_MAP)[Locale][Namespace]>;
