import axios from 'axios';
import { DeeplRequest, DeeplResponse } from './types';
import dotenv from 'dotenv';

// initialize environment variables
dotenv.config();

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_API_KEY) throw new Error('DEEPL_API_KEY is not defined');

/**
 * Translates text using the DeepL API
 */
export const translate = async (deeplParams: DeeplRequest) => {
    const response = await axios<DeeplResponse>({
        method: 'POST',
        url: 'https://api-free.deepl.com/v2/translate',
        params: deeplParams,
        headers: { Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}` },
    });

    return response.data.translations[0].text;
};

export default translate;
