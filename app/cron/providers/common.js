import {request} from '@k03mad/request';

import {logError} from '../../../utils/logs.js';

const links = [
    {
        link: 'https://disk.2gis.com/android/Latest/2GIS.apk',
        opts: {ua: 'curl', proxy: true},
    },
    {
        link: 'https://kpdl.cc/k.apk',
        homepage: 'https://kpdl.cc/faq.html',
    },
];

const parse = [
    {
        homepage: 'https://get.videolan.org/vlc-android/last/',
        re: /href="(.+arm64.+.apk)"/,
        opts: {ua: 'curl'},
        relative: true,
    },
    {
        homepage: 'https://download.wireguard.com/android-client/',
        re: /href="(.+.apk)"/,
        relative: true,
    },
    {
        homepage: 'https://televizo.net/',
        re: /href="(.+)">APK \(ALL DEVICES\)/,
    },
];

/** */
export default async () => {
    await Promise.all(parse.map(async ({homepage, opts, re, relative}) => {
        try {
            const {body} = await request(homepage);

            const url = body?.match(re)?.[1];
            const link = relative ? homepage + url : url;

            links.push({link, opts, homepage});
        } catch (err) {
            logError(err);
        }
    }));

    return links;
};
