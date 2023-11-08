import {request} from '@k03mad/request';

import {logError} from '../../../utils/logs.js';

const links = [
    {link: 'https://d.tap.io/latest'},
    {link: 'https://disk.2gis.com/android/Latest/2GIS.apk', opts: {ua: 'curl', proxy: true}},
    {link: 'https://kpdl.cc/k.apk'},
    {link: 'https://telegram.org/dl/android/apk'},
    {link: 'https://www.rustore.ru/download'},
];

const parse = [
    {
        req: 'https://get.videolan.org/vlc-android/last/',
        re: /href="(.+arm64.+.apk)"/,
        opts: {ua: 'curl'},
        relative: true,
    },
    {
        req: 'https://download.wireguard.com/android-client/',
        re: /href="(.+.apk)"/,
        relative: true,
    },
    {
        req: 'https://televizo.net/',
        re: /href="(.+)">APK \(ALL DEVICES\)/,
    },
];

/**
 * @returns {Promise<Array<{link: string, opts: {ua: string}}>>}
 */
export default async () => {
    await Promise.all(parse.map(async ({opts, re, relative, req}) => {
        try {
            const {body} = await request(req);

            const url = body?.match(re)?.[1];
            const link = relative ? req + url : url;

            links.push({link, opts});
        } catch (err) {
            logError(err);
        }
    }));

    return links;
};
