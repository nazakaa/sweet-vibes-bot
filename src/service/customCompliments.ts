import { getRandomElementOfArray } from '../utils/arrayRandomElement';

const compliments = ['You look nice today', 'You are a smart cookie'];

export const getCompliment = () => {
    return getRandomElementOfArray(compliments);
};

export default getCompliment;
