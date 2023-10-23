import {request} from '@k03mad/request';

import {download} from '../../../utils/aria.js';
import {cleanFolder, getCurrentFilename} from '../../../utils/files.js';
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
export default {
    interval: '15 */6 * * *',

    task: async () => {
        const {body} = await request(REQUEST_URL, {
            headers: {'user-agent': REQUEST_UA},
        });

        const urls = body.match(RESPONSE_ELEMENT_RE);

        await cleanFolder(APK_DIR);

        await Promise.all([...new Set(urls)].map(async url => {
            await Promise.all(DOWNLOAD_APPS.map(async app => {
                if (url.includes(app.apkUrlIncludes)) {
                    await download(`${APK_DIR}/${app.saveToFolder}`, url);
                }
            }));
        }));
    },
};
