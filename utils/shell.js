import cp from 'node:child_process';
import util from 'node:util';

import {filterToString} from './array.js';

const exec = util.promisify(cp.exec);

/**
 * @param {string} runString
 * @returns {Promise<string>}
 */
export const run = async runString => {
    try {
        const {stderr, stdout} = await exec(runString);
        return filterToString([stdout, stderr]);
    } catch (err) {
        return filterToString([err, err?.stdout, err?.stderr]);
    }
};
