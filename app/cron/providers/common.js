import {request} from '@k03mad/request';

import {logError} from '../../../utils/logs.js';
import {getUa} from '../../../utils/request.js';

const LINKS = [
    {link: 'https://disk.2gis.com/android/Latest/2GIS.apk', opts: {ua: 'curl'}},
    {link: 'https://github.com/yuliskov/SmartTube/releases/download/latest/smarttube_stable.apk'},
    {link: 'https://kpdl.cc/k.apk'},
    {link: 'https://telegram.org/dl/android/apk'},
];

const WITH_REQUEST_PARSE = [
    {
        req: 'https://get.videolan.org/vlc-android/last/',
        re: /"(VLC.+arm64-v8a\.apk)"/,
        opts: {ua: 'curl'},
    },
    {
        req: 'https://download.wireguard.com/android-client/',
        re: /href="(.+.apk)"/,
    },
];

/**
 * @returns {Promise<Array<{link: string, opts: {ua: string}}>>}
 */
export default async () => {
    await Promise.all(WITH_REQUEST_PARSE.map(async ({opts, re, req}) => {
        try {
            const {body} = await request(req, {headers: {'user-agent': getUa()}});
            const apk = body?.match(re)?.[1];

            LINKS.push({link: req + apk, opts});
        } catch (err) {
            logError(err);
        }
    }));

    return LINKS;
};
