/**
 * @param {string} str
 */
export const getNumberFromString = str => Number(str.replaceAll(/\D+/g, ''));
