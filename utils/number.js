/**
 * @param {string} str
 */
export const getNumberFromString = str => Number(str.replaceAll(/\D+/g, ''));

/**
 * @param {number} min
 * @param {number} max
 */
export const randomNumberFromInterval = (min, max) => Math.floor(
    (Math.random() * (max - min + 1)) + min,
);
