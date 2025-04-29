export const getToday = () => new Date().toISOString().split('T')[0];

export const getRandomChallenge = (challenges) => {
    if(!challenges || challenges.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
};