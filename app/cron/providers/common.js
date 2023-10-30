import {request} from '@k03mad/request';

import {logError} from '../../../utils/logs.js';

const links = [
    {link: 'https://disk.2gis.com/android/Latest/2GIS.apk', opts: {ua: 'curl'}},
    {link: 'https://kpdl.cc/k.apk'},
    {link: 'https://telegram.org/dl/android/apk'},
];

const parse = [
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
    await Promise.all(parse.map(async ({opts, re, req}) => {
        try {
            const {body} = await request(req);
            const apk = body?.match(re)?.[1];

            links.push({link: req + apk, opts});
        } catch (err) {
            logError(err);
        }
    }));

    return links;
};
