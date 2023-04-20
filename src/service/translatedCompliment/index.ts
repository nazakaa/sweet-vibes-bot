import getCompliment from '../complimentr';
import translate from '../deepl';
import { DeeplRequest, DeeplSupportedLanguages } from '../deepl/types';
import { Locale } from '../localePicker/types';

type DeeplRequestWithoutTextAndTargetLanguage = Omit<DeeplRequest, 'text' | 'target_lang'>;

export const getTranslatedCompliment = async (
    language: Locale,
    translationOptions?: DeeplRequestWithoutTextAndTargetLanguage
) => {
    const deeplLanguage = mapLanguageToDeeplLanguage(language);

    const randomCompliment = await getCompliment();

    // no need to translate if the target language is English
    if (deeplLanguage === 'EN') return randomCompliment;

    const deeplRequestOptions: DeeplRequest = {
        ...translationOptions,
        text: randomCompliment,
        target_lang: deeplLanguage,
    };
    return await translate(deeplRequestOptions);
};

const mapLanguageToDeeplLanguage = (language: Locale): DeeplSupportedLanguages => {
    switch (language) {
        case 'en':
            return 'EN';
        case 'ua':
            return 'UK';
        default:
            throw new Error('Language is not supported');
    }
};

export default getTranslatedCompliment;
