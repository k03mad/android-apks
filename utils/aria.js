import fs from 'node:fs/promises';

import {getCurrentDate} from './date.js';
import {cleanFolder} from './files.js';
import {getUa} from './request.js';
import {run} from './shell.js';

const getAriaArgs = uaType => [
    '--continue=true',
    '--split=16',
    '--max-connection-per-server=16',
    '--min-split-size=1M',
    '--max-concurrent-downloads=1',
    `--user-agent="${getUa(uaType)}"`,
].join(' ');

/**
 * @param {string} dir
 * @param {string} url
 * @param {object} [opts]
 * @param {'desktop'|'mobile'|'empty'} [opts.ua]
 */
export const download = async (dir, url, opts = {}) => {
    await fs.mkdir(dir, {recursive: true});
    await run(`cd ${dir} && aria2c ${getAriaArgs(opts.ua)} ${url}`);
    await fs.writeFile(`${dir}/timestamp.log`, getCurrentDate());
};

/**
 * @param {string} dir
 * @param {string} url
 * @param {object} [opts]
 * @param {'desktop'|'mobile'|'empty'} [opts.ua]
 */
export const cleanAndDownload = async (dir, url, opts) => {
    await cleanFolder(dir);
    await download(dir, url, opts);
};
