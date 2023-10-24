import {request} from '@k03mad/request';

import {cleanAndDownload} from '../../../utils/aria.js';
import {getApkDir} from '../../../utils/meta.js';

const APK_DIR = getApkDir(import.meta.url);

const REQUEST_DOMAIN = 'https://telegram.org';
const REQUEST_URL = `${REQUEST_DOMAIN}/android`;
const RESPONSE_ELEMENT_RE = /href="(.+)" class="td_download_btn/;

/** */
export default async () => {
    const {body} = await request(REQUEST_URL);
    const hrefRelative = body.match(RESPONSE_ELEMENT_RE)[1];
    const href = REQUEST_DOMAIN + hrefRelative;

    await cleanAndDownload(APK_DIR, href);
};
