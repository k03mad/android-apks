import fs from 'node:fs/promises';

import {getCurrentDate} from './date.js';
import {cleanFolder} from './files.js';
import {run} from './shell.js';

const aria = url => `aria2c -c -s 16 -x 16 -k 1M -j 1 ${url}`;

/**
 * @param {string} dir
 * @param {string} url
 */
export const download = async (dir, url) => {
    await fs.mkdir(dir, {recursive: true});
    await run(`cd ${dir} && ${aria(url)}`);
    await fs.writeFile(`${dir}/timestamp.log`, getCurrentDate());
};

/**
 * @param {string} dir
 * @param {string} url
 */
export const cleanAndDownload = async (dir, url) => {
    await cleanFolder(dir);
    await download(dir, url);
};
