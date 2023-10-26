import fs from 'node:fs/promises';
import path from 'node:path';

import {getCurrentDate} from './date.js';
import {getUa} from './request.js';
import {run} from './shell.js';

const getAriaArgs = uaType => [
    '--continue=true',
    '--split=16',
    '--max-connection-per-server=16',
    '--min-split-size=1M',
    '--max-concurrent-downloads=1',
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
    const logFile = apkPath ? `${path.basename(apkPath)}.log` : Date.now();

    await fs.writeFile(`${dir}/${logFile}`, getCurrentDate());
};
