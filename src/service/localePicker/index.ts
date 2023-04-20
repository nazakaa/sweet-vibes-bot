import LOCALES_MAPPING from './localesMapping';
import { Locale, Namespace } from './types';

/**
 * Get localized text by locale and namespace.
 */
export const getLocalizedText = (locale: Locale, namespace: Namespace) => {
    const localizedNamespace = LOCALES_MAPPING[locale][namespace];

    type Key = keyof typeof localizedNamespace;
    type Options = { replace?: Record<string, string> };

    const func = (key: Key, options?: Options): string => {
        const valueByKey = localizedNamespace[key];

        if (!options?.replace) return valueByKey;
        else {
            const newValue = Object.entries(options.replace).reduce((acc, [keyToReplace, value]) => {
                const newValue = acc.replace(`{{${keyToReplace}}}`, value);
                if (acc === newValue)
                    throw new Error(
                        `[${locale}/${namespace}]: Template key "${keyToReplace}" has not been found in "${key}" template string`
                    );

                acc = newValue;
                return acc;
            }, valueByKey);
            return newValue;
        }
    };

    return func;
};

export default getLocalizedText;

// todo: this file needs refactoring
