import {request} from '@k03mad/request';

import {cleanAndDownload} from '../../../utils/aria.js';
import {getApkDir} from '../../../utils/meta.js';

const APK_DIR = getApkDir(import.meta.url);

const REQUEST_URL = 'https://apk.2gis.ru/';
const RESPONSE_ELEMENT_RE = /clickLink":"(.+?)"/;

/** */
export default async () => {
    const {body} = await request(REQUEST_URL);
    const href = body.match(RESPONSE_ELEMENT_RE)[1];

    await cleanAndDownload(APK_DIR, href, {ua: 'empty'});
};
