import axios from 'axios';
import capitalize from '../../utils/capitalize';

interface ComplimentrResponse {
    compliment: string;
}

export const getCompliment = async () => {
    const response = await axios<ComplimentrResponse>({
        method: 'GET',
        url: 'https://complimentr.com/api',
    });

    // capitalize the first letter of the compliment, since the API doesn't do it
    return capitalize(response.data.compliment);
};

export default getCompliment;
