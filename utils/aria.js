import fs from 'node:fs/promises';

import _debug from 'debug';

import env from '../env.js';
import {getUa} from './request.js';
import {run} from './shell.js';

const debug = _debug('mad:aria');

const getAriaArgs = opts => [
    '--continue=true',
    '--split=5',
    '--max-connection-per-server=5',
    '--min-split-size=1M',
    '--check-certificate=false',
    '--allow-overwrite=true',
    '--max-tries=5',
    '--retry-wait=5',
    `--user-agent="${getUa(opts.ua || 'mobile')}"`,
    opts.proxy && env.aria.proxy ? `--all-proxy="${env.aria.proxy}"` : '',
].filter(Boolean).join(' ');

/**
 * @param {string} dir
 * @param {string} url
 * @param {object} [opts]
 * @param {'desktop'|'mobile'|'curl'|'empty'} [opts.ua]
 * @param {boolean} [opts.proxy]
 * @param {string} [opts.ext]
 */
export const download = async (dir, url, opts = {}) => {
    const cmd = `cd ${dir} && aria2c ${getAriaArgs(opts)} ${url}`;
    debug.extend('cmd')(cmd);

    await fs.mkdir(dir, {recursive: true});
    const output = await run(cmd);

    if (opts.ext) {
        const filePathRe = new RegExp(`\\|(/.+\\.${opts.ext})`);
        const filePath = output?.match(filePathRe)?.[1];
        debug.extend('file')(filePath);

        return filePath;
    }
};
