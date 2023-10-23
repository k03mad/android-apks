import fs from 'node:fs/promises';

import {run} from './shell.js';

/**
 * @param {string} dir
 * @param {string} url
 */
export const download = async (dir, url) => {
    await fs.mkdir(dir, {recursive: true});
    await run(`cd ${dir} && aria2c ${url}`);
};
