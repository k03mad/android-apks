import fs from 'node:fs/promises';

import {request, requestCache} from '@k03mad/request';

import cronConfig from '../app/cron/config.js';

import {retry} from './promise.js';

const saveErr = async err => {
    await fs.mkdir(cronConfig.output.folder, {recursive: true});
    await fs.appendFile(cronConfig.output.errors, err);
};

/**
 * @param {...any} args
 */
export const req = async (...args) => {
    try {
        return await retry(() => request(...args));
    } catch (err) {
        if (err.__req) {
            await saveErr(err.__req);
        }

        throw err;
    }
};

/**
 * @param {...any} args
 */
export const reqCache = async (...args) => {
    try {
        return await retry(() => requestCache(...args));
    } catch (err) {
        if (err.__req) {
            await saveErr(err.__req);
        }

        throw err;
    }
};

/**
 * @param {'desktop'|'mobile'|'curl'|'empty'} type
 * @returns {Promise<string>}
 */
export const getUa = async (type = 'mobile') => {
    const chromeVersions = 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions.json';

    const {body} = await reqCache(chromeVersions);
    const {version} = body.channels.Stable;

    const ua = {
        desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        + 'AppleWebKit/537.36 (KHTML, like Gecko) '
        + `Chrome/${version} `
        + 'Safari/537.36',

        mobile: 'Mozilla/5.0 (Linux; Android 10; K) '
        + 'AppleWebKit/537.36 (KHTML, like Gecko) '
        + `Chrome/${version} `
        + 'Mobile Safari/537.36',

        curl: 'curl/8.4.0',

        aria: 'aria/1.36.0',

        empty: '',
    };

    return ua[type];
};
