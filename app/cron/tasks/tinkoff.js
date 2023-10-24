import {request} from '@k03mad/request';

import {download} from '../../../utils/aria.js';
import {cleanFolder, getCurrentFilename} from '../../../utils/files.js';
import {logPlainError} from '../../../utils/logging.js';
import config from '../../server/config.js';

const APK_DIR = `${config.static.apk}/${getCurrentFilename(import.meta.url)}`;

const DOWNLOAD_APPS = [
    {
        apkUrlIncludes: 'Tinkoff_Invest',
        saveToFolder: 'invest',
    },
    {
        apkUrlIncludes: 'tinkoff-bank',
        saveToFolder: 'bank',
    },
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

    const urls = body.match(RESPONSE_ELEMENT_RE);
    await cleanFolder(APK_DIR);

    const errors = [];

    for (const url of new Set(urls)) {
        for (const app of DOWNLOAD_APPS) {
            if (url.includes(app.apkUrlIncludes)) {
                const dir = `${APK_DIR}/${app.saveToFolder}`;

                try {
                    await download(dir, url);
                } catch (err) {
                    errors.push(url, dir, err);
                }
            }
        }
    }

    if (errors.length > 0) {
        logPlainError(errors);
    }
};
