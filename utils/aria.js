import fs from 'node:fs/promises';

import {getTimestamp} from '../app/cron/task/helpers/json.js';
import env from '../env.js';

import {getUa} from './request.js';
import {run} from './shell.js';

const getAriaArgs = async opts => [
    // general
    '--continue=true',
    '--remote-time=true',
    // connection
    '--split=3',
    '--max-connection-per-server=3',
    '--min-split-size=1M',
    // retries
    '--max-tries=12',
    '--retry-wait=5',
    // args
    `--user-agent="${await getUa(opts.ua)}"`,
    opts.header ? `--header="${opts.header}"` : '',
    opts.dir ? `--dir="${opts.dir}"` : '',
    opts.skipSSL ? '--check-certificate=false' : '',
    opts.proxy && env.aria.proxy ? `--all-proxy="${env.aria.proxy}"` : '',
].filter(Boolean).join(' ');

/**
 * @param {string} url
 * @param {object} [opts]
 * @param {'desktop'|'mobile'|'curl'|'aria'|'empty'} [opts.ua]
 * @param {boolean} [opts.proxy]
 * @param {string} [opts.ext]
 * @param {boolean} [opts.skipSSL]
 * @param {string} [opts.header]
 */
export const download = async (url, opts = {}) => {
    const cmd = `aria2c ${await getAriaArgs(opts)} "${url}"`;

    if (opts.dir) {
        await fs.mkdir(opts.dir, {recursive: true});
    }

    const startDate = new Date();
    const logs = await run(cmd);

    const data = {
        duration: getTimestamp(startDate).duration,
    };

    if (opts.ext) {
        const filePathRe = new RegExp(`path[\\s\\S]+\\|(.+${opts.ext})`);
        const filePath = logs.stdout?.match(filePathRe)?.[1];

        data.downloadedApkPath = filePath;
    }

    return data;
};
