import LOCALE_MAP from './localeMap';
import { FullLocaleKeyPath, Locale, Namespace } from './types';

/**
 * Get localized string
 * @param locale locale from which to retrieve the string (en, ua, etc.)
 * @param namespace namespace from which the string should be fetched (common, buttons, etc)
 * @param pathToValue full path (array of keys, separated by dots) to the text. Example --> fisrt.second.third
 * @param replacementValues object with keys and values to replace placeholders in the string. Example --> `{placeholderX: 'valueX'}`
 */
export const t = (
    locale: Locale,
    namespace: Namespace,
    pathToValue: FullLocaleKeyPath,
    replacementValues?: Record<string, string>
): string => {
    const chosenNamespace = LOCALE_MAP[locale][namespace];
    let localizedString = extractTextByFullPath(chosenNamespace, pathToValue.split('.'));

    if (replacementValues) localizedString = replacePlaceholders(localizedString, replacementValues);

    return localizedString;
};

export default t;

/**
 * Extract value from possibly nested object by full path
 * @param object object to get value from
 * @param path full path (array of keys, separated by dots) to the text. Example --> fisrt.second.third
 */
const extractTextByFullPath = (objWithText: Record<string, unknown>, pathToText: string[]): string => {
    let result = objWithText;

    for (const key of pathToText) {
        if (!(key in result)) throw new Error(`Key "${key}" not found in object`);
        result = result[key] as any;
    }

    return typeof result === 'string' ? result : '';
};

/**
 * Fill placeholders in the string with values from the object
 * @param str string with placeholders in the format "My {placeholderX} string" to be replaced
 * @param replacementValues object with keys and values to replace placeholders in the string. Example --> `{placeholderX: 'valueX'}`
 */
const replacePlaceholders = (str: string, replacementValues: Record<string, string>): string => {
    let result = str;

    for (const key in replacementValues) {
        const newStr = result.replaceAll(`{${key}}`, replacementValues[key]);
        if (newStr === result) throw new Error(`Key "${key}" in string "${str}" not found`);
        result = newStr;
    }

    return result;
};
