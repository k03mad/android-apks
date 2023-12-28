import fs from 'node:fs/promises';

import _debug from 'debug';

import env from '../env.js';

import {getUa} from './request.js';
import {run} from './shell.js';

const debug = _debug('mad:aria');

const getAriaArgs = opts => [
    // general
    '--continue=true',
    '--remote-time=true',
    // connection
    '--split=5',
    '--max-connection-per-server=5',
    '--min-split-size=1M',
    // retries
    '--max-tries=5',
    '--retry-wait=5',
    // args
    `--user-agent="${getUa(opts.ua)}"`,
    opts.header ? `--header="${opts.header}"` : '',
    opts.dir ? `--dir="${opts.dir}"` : '',
    opts.skipCheckCert ? '--check-certificate=false' : '',
    opts.proxy && env.aria.proxy ? `--all-proxy="${env.aria.proxy}"` : '',
].filter(Boolean).join(' ');

/**
 * @param {string} url
 * @param {object} [opts]
 * @param {'desktop'|'mobile'|'curl'|'aria'|'empty'} [opts.ua]
 * @param {boolean} [opts.proxy]
 * @param {string} [opts.ext]
 * @param {boolean} [opts.skipCheckCert]
 * @param {string} [opts.header]
 */
export const download = async (url, opts = {}) => {
    const cmd = `time aria2c ${getAriaArgs(opts)} "${url}"`;
    const timeRe = /real\s+(\d+)m([\d.]+)s/;
    debug.extend('cmd')('%o', cmd);

    if (opts.dir) {
        await fs.mkdir(opts.dir, {recursive: true});
    }

    const logs = await run(cmd);

    const data = {};
    const time = logs.stderr?.match(timeRe);

    if (time) {
        data.durationSeconds = Number(time[1]) * 60 + Number(time[2]);
    }

    if (opts.ext) {
        const filePathRe = new RegExp(`path[\\s\\S]+\\|(.+${opts.ext})`);
        const filePath = logs.stdout?.match(filePathRe)?.[1];
        debug.extend('downloaded')('%o', filePath);

        data.downloadedApkPath = filePath;
    }

    return data;
};
