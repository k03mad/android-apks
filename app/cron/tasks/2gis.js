import {request} from '@k03mad/request';

import {download} from '../../../utils/aria.js';
import {cleanFolder, getCurrentFilename} from '../../../utils/files.js';
import config from '../../server/config.js';

const APK_DIR = `${config.static.apk}/${getCurrentFilename(import.meta.url)}`;

const REQUEST_URL = 'https://apk.2gis.ru/';
const RESPONSE_ELEMENT_RE = /clickLink":"(.+?)"/;

/** */
export default async () => {
    const {body} = await request(REQUEST_URL);
    const href = body.match(RESPONSE_ELEMENT_RE)[1];

    await cleanFolder(APK_DIR);
    await download(APK_DIR, href);
};
