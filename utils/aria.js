import fs from 'node:fs/promises';

import {getUa} from './request.js';
import {run} from './shell.js';

const getAriaArgs = uaType => [
    '--continue=true',
    '--split=5',
    '--max-connection-per-server=5',
    '--min-split-size=1M',
    '--check-certificate=false',
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
    const output = await run(`cd ${dir} && aria2c ${getAriaArgs(opts.ua)} ${url}`);

    const apkPath = output?.match(/\/(.+)\.apk/)?.[1];
    return apkPath;
};
