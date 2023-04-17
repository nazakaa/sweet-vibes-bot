export const getRandomElementOfArray = <T>(arr: T[]) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

export default getRandomElementOfArray;
