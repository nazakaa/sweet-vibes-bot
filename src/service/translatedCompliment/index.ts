import getCompliment from '../complimentr';
import translate from '../deepl';
import { DeeplRequest, DeeplSupportedLanguages } from '../deepl/types';

type DeeplRequestWithoutTextAndTargetLanguage = Omit<DeeplRequest, 'text' | 'target_lang'>;

export const getTranslatedCompliment = async (
    language: DeeplSupportedLanguages,
    translationOptions?: DeeplRequestWithoutTextAndTargetLanguage
) => {
    const randomCompliment = await getCompliment();

    // no need to translate if the target language is English
    if (language === 'EN') return randomCompliment;

    const _translationOptions: DeeplRequest = { ...translationOptions, text: randomCompliment, target_lang: language };
    return await translate(_translationOptions);
};

export default getTranslatedCompliment;
