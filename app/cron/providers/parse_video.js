import {getApkFromParse} from './helpers/parse.js';

/** */
export default () => getApkFromParse([
    {
        page: 'https://get.videolan.org/vlc-android/last/',
        opts: {
            ua: 'curl',
        },
        href: {
            re: /href="(.+arm64.+\.apk)"/,
            relative: true,
        },
    },
    {
        page: 'https://kpdl.link/faq.html',
        href: {
            re: /href="(.+\.apk)"/,
        },
    },
    {
        page: 'https://televizo.net/',
        href: {
            text: 'DOWNLOAD APK FILE',
        },
    },
    {
        page: 'https://android.zona.pub/download.html',
        href: {
            text: 'Android 5 и выше',
            replace: {
                from: '//',
                to: 'https://',
            },
        },
    },
]);
