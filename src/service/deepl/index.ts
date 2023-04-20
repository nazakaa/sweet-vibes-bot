import axios from 'axios';
// import dotenv from 'dotenv';
import { DeeplRequest, DeeplResponse } from './types';

// // initialize environment variables
// dotenv.config();

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_API_KEY) throw new Error('DEEPL_API_KEY is not defined');

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

// translate({
//     target_lang: 'UK',
//     text: 'You have completely divine thighs',
// }).then((data) => console.log(data));
