import LOCALES_MAPPING from './localesMapping';
import { Locale, Namespace } from './types';

/**
 * Get localized text by locale and namespace.
 */
export const getLocalizedText = (locale: Locale, namespace: Namespace) => {
    return LOCALES_MAPPING[locale][namespace];
};

export default getLocalizedText;
