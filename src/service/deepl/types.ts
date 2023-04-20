/**
 * Language codes and their full names.
 * @see https://www.deepl.com/docs-api/translating-text/request/
 */
export type DeeplSupportedLanguages =
    | 'BG' // Bulgarian
    | 'CS' // Czech
    | 'DA' // Danish
    | 'DE' // German
    | 'EL' // Greek
    | 'EN' // English
    | 'ES' // Spanish
    | 'ET' // Estonian
    | 'FI' // Finnish
    | 'FR' // French
    | 'HU' // Hungarian
    | 'ID' // Indonesian
    | 'IT' // Italian
    | 'JA' // Japanese
    | 'KO' // Korean
    | 'LT' // Lithuanian
    | 'LV' // Latvian
    | 'NB' // Norwegian (Bokmål)
    | 'NL' // Dutch
    | 'PL' // Polish
    | 'PT' // Portuguese (all Portuguese varieties mixed)
    | 'RO' // Romanian
    | 'RU' // Russian
    | 'SK' // Slovak
    | 'SL' // Slovenian
    | 'SV' // Swedish
    | 'TR' // Turkish
    | 'UK' // Ukrainian !!!
    | 'ZH'; // Chinese

/**
 * Request body for the DeepL API.
 * @see https://www.deepl.com/docs-api/translating-text/request/
 */
export interface DeeplRequest {
    /**
     * Text to be translated. Only UTF-8-encoded plain text is supported.
     * The parameter may be specified multiple times and translations are returned in the same order as they are requested.
     * Each of the parameter values may contain multiple sentences.
     */
    text: string;
    /**
     * Language of the text to be translated.
     */
    source_lang?: DeeplSupportedLanguages;
    /**
     * The language into which the text should be translated
     */
    target_lang: DeeplSupportedLanguages;
    /**
     * Sets whether the translation engine should first split the input into sentences.
     * For text translations where tag_handling is not set to html, the default value is 1,
     * meaning the engine splits on punctuation and on newlines.
     */
    split_sentences?: '0' | '1' | 'nonewlines';
    /**
     * Sets whether the translation engine should respect the original formatting, even if it would usually correct some aspects.
     */
    preserve_formatting?: '0' | '1';
    /**
     * Sets whether the translated text should lean towards formal or informal language.
     */
    formality?: 'default' | 'more' | 'less' | 'prefer_more' | 'prefer_less';
    /**
     * Specify the glossary to use for the translation.
     * Important: This requires the source_lang parameter to be set
     * and the language pair of the glossary has to match the language pair of the request.
     */
    glossary_id?: string;
    /**
     * Sets which kind of tags should be handled.
     */
    tag_handling?: 'xml' | 'html';
    /**
     * Comma-separated list of XML tags which never split sentences.
     */
    non_splitting_tags?: string;
    /**
     * The automatic detection of the XML structure won't yield best results in all XML files.
     */
    outline_detection?: '0' | '1';
    /**
     * Comma-separated list of XML tags which always cause splits.
     */
    splitting_tags?: string;
    /**
     * Comma-separated list of XML tags that indicate text not to be translated.
     */
    ignore_tags?: string;
}

/**
 * Response from the DeepL API.
 * @see https://www.deepl.com/docs-api/translating-text/request/
 */
export interface DeeplResponse {
    translations: [
        {
            /**
             * The language detected in the source text. It reflects the value of the source_lang parameter, when specified.
             */
            detected_source_language: DeeplSupportedLanguages;
            /**
             * The translated text.
             */
            text: string;
        }
    ];
}
