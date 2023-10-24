import {request} from '@k03mad/request';

import {cleanAndDownload} from '../../../../utils/aria.js';
import {getUa} from '../../../../utils/request.js';

const REQUEST_URL = 'https://www.tinkoff.ru/apps/';
const RESPONSE_ELEMENT_RE = /[^"]+apk/g;

/**
 * @param {string} apkDir
 * @param {string} apkUrlIncludes
 */
export default async (apkDir, apkUrlIncludes) => {
    const {body} = await request(REQUEST_URL, {
        headers: {'user-agent': getUa()},
    });

    const urls = body.match(RESPONSE_ELEMENT_RE);

    for (const url of new Set(urls)) {
        if (url.includes(apkUrlIncludes)) {
            return cleanAndDownload(apkDir, url);
        }
    }
};
