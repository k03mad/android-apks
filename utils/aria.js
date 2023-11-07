import fs from 'node:fs/promises';

import _debug from 'debug';

import env from '../env.js';
import {getUa} from './request.js';
import {run} from './shell.js';

const debug = _debug('mad:aria');

const getAriaArgs = opts => [
    // general
    '--continue=true',
    '--allow-overwrite=true',
    '--remote-time=true',
    // connection
    '--split=5',
    '--max-connection-per-server=5',
    '--min-split-size=1M',
    // retries
    '--max-tries=5',
    '--retry-wait=5',
    // args
    `--user-agent="${getUa(opts.ua || 'mobile')}"`,
    opts.dir ? `--dir=${opts.dir}` : '',
    opts.skipCheckCert ? '--check-certificate=false' : '',
    opts.proxy && env.aria.proxy ? `--all-proxy="${env.aria.proxy}"` : '',
].filter(Boolean).join(' ');

/**
 * @param {string} url
 * @param {object} [opts]
 * @param {'desktop'|'mobile'|'curl'|'empty'} [opts.ua]
 * @param {boolean} [opts.proxy]
 * @param {string} [opts.ext]
 * @param {boolean} [opts.skipCheckCert]
 */
export const download = async (url, opts = {}) => {
    const cmd = `aria2c ${getAriaArgs(opts)} ${url}`;
    debug.extend('cmd')(cmd);

    if (opts.dir) {
        await fs.mkdir(opts.dir, {recursive: true});
    }

    const output = await run(cmd);

    if (opts.ext) {
        const filePathRe = new RegExp(`path[\\s\\S]+\\|(.+${opts.ext})`);
        const filePath = output?.match(filePathRe)?.[1];
        debug.extend('file')(filePath);

        return filePath;
    }
};
