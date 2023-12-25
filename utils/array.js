/**
 * @param {any|any[]} elem
 * @returns {any[]}
 */
export const convertToArray = elem => Array.isArray(elem) ? elem : [elem];

/**
 * @param {Array} array
 */
export const shuffle = array => {
    const arrClone = structuredClone(array);

    for (let i = arrClone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrClone[i], arrClone[j]] = [arrClone[j], arrClone[i]];
    }

    return arrClone;
};
