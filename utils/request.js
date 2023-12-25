import fs from 'node:fs/promises';

import {request} from '@k03mad/request';

import cronConfig from '../app/cron/config.js';

import {retry} from './promise.js';

const ua = () => ({
    desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
    + 'AppleWebKit/537.36 (KHTML, like Gecko) '
    + 'Chrome/120.0.6099.110 '
    + 'Safari/537.36',

    mobile: 'Mozilla/5.0 (Linux; Android 10; K) '
    + 'AppleWebKit/537.36 (KHTML, like Gecko) '
    + 'Chrome/120.0.0.0 '
    + 'Mobile Safari/537.36',

    curl: 'curl/8.4.0',

    aria: 'aria/1.36.0',

    empty: '',
});

/**
 * @param {'desktop'|'mobile'|'curl'|'empty'} type
 */
export const getUa = (type = 'mobile') => ua()[type];

/**
 * @param {...any} args
 */
export const req = async (...args) => {
    try {
        return await retry(() => request(...args));
    } catch (err) {
        if (err.__req) {
            await fs.mkdir(cronConfig.output.folder, {recursive: true});
            await fs.appendFile(cronConfig.output.errors, err.__req);
        }

        throw err;
    }
};
