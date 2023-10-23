/**
 * @param {any|any[]} elem
 * @returns {any[]}
 */
export const convertToArray = elem => Array.isArray(elem) ? elem : [elem];

/**
 * @param {Array<string>} arr
 * @returns {string}
 */
export const filterToString = arr => arr.filter(Boolean).join('\n\n');
