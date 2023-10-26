/* eslint-disable no-console */

import {convertToArray} from './array.js';

/**
 * @param {string|string[]} msg
 * @returns {void}
 */
export const log = msg => console.log(msg);

/**
 * @param {string|string[]} msg
 * @returns {void}
 */
export const logError = msg => console.error(convertToArray(msg).join('\n'));
