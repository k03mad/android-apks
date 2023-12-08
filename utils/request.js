import {request} from '@k03mad/request';
import _ from 'lodash';

import {retry} from './promise.js';

const chromeVersion = () => `${_.random(100, 120)}.0.${_.random(5000, 6000)}.${_.random(2000, 3000)}`;
const curlVersion = () => `${_.random(5, 9)}.${_.random(1, 9)}.0`;
const ariaVersion = () => `1.${_.random(10, 60)}.0`;

const ua = () => ({
    desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
    + 'AppleWebKit/537.36 (KHTML, like Gecko) '
    + `Chrome/${chromeVersion()} `
    + 'Safari/537.36',

    mobile: 'Mozilla/5.0 (Linux; Android 10; K) '
    + 'AppleWebKit/537.36 (KHTML, like Gecko) '
    + `Chrome/${chromeVersion()} `
    + 'Mobile Safari/537.36',

    curl: `curl/${curlVersion()}`,

    aria: `aria/${ariaVersion()}`,

    empty: '',
});

/**
 * @param {'desktop'|'mobile'|'curl'|'empty'} type
 */
export const getUa = (type = 'mobile') => ua()[type];

/**
 * @param {...any} args
 */
export const req = (...args) => retry(() => request(...args));
