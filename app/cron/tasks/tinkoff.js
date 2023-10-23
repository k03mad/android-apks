import {request} from '@k03mad/request';

import {cleanFolderDownloadApk} from '../../../utils/aria.js';
import {getCurrentFilename} from '../../../utils/files.js';
import config from '../../server/config.js';

const APK_DIR = `${config.static.apk}/${getCurrentFilename(import.meta.url)}`;

const DOWNLOAD_APPS_BY_LINK_INCLUDES = [
    'Tinkoff_Invest',
    'tinkoff-bank',
];

const REQUEST_URL = 'https://www.tinkoff.ru/apps/';

const REQUEST_UA = 'Mozilla/5.0 (Linux; Android 11; Pixel 5) '
                 + 'AppleWebKit/537.36 (KHTML, like Gecko) '
                 + 'Chrome/90.0.4430.91 Mobile Safari/537.36';

const RESPONSE_ELEMENT_RE = /[^"]+apk/g;

/** */
export default async () => {
    const {body} = await request(REQUEST_URL, {
        headers: {'user-agent': REQUEST_UA},
    });

    const hrefs = body.match(RESPONSE_ELEMENT_RE);

    await Promise.all([...new Set(hrefs)].map(async href => {
        for (const app of DOWNLOAD_APPS_BY_LINK_INCLUDES) {
            if (href.includes(app)) {
                await cleanFolderDownloadApk(`${APK_DIR}/${app}`, href);
            }
        }
    }));
};
