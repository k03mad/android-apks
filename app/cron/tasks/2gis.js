import {request} from '@k03mad/request';

import {APK} from '../../../config.js';
import {cleanFolderDownloadApk} from '../../../utils/aria.js';
import {getCurrentFilename} from '../../../utils/files.js';

const APK_DIR = `${APK.dir}/${getCurrentFilename(import.meta.url)}`;

const REQUEST_URL = 'https://apk.2gis.ru/';
const RESPONSE_ELEMENT_RE = /clickLink":"(.+?)"/;

/** */
export default async () => {
    const {body} = await request(REQUEST_URL);

    const href = body.match(RESPONSE_ELEMENT_RE)[1];
    await cleanFolderDownloadApk(APK_DIR, href);
};
