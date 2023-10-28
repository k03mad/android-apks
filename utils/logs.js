/* eslint-disable no-console */

import {convertToArray} from './array.js';

/**
 * @param {string|string[]} msg
 * @returns {void}
 */
export const log = msg => convertToArray(msg)
    .filter(Boolean)
    .forEach(elem => console.log(elem));

/**
 * @param {string|string[]} msg
 * @returns {void}
 */
export const logError = msg => convertToArray(msg)
    .filter(Boolean)
    .forEach(elem => console.error(elem));
