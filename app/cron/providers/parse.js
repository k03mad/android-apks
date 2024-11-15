import {getApkFromParse} from './helpers/parse.js';

/** */
export default () => getApkFromParse([
    {
        page: 'https://download.wireguard.com/android-client/',
        href: {
            text: /\.apk$/,
            relative: true,
        },
    },
    {
        page: 'https://www.whatsapp.com/android',
        opts: {
            ua: 'curl',
            semVerRemovePatch: true,
        },
        href: {
            selector: '[data-ms*="Android_PackageInstaller_Hero_Link"]',
        },
    },
    {
        page: 'https://telegram.org/android',
        href: {
            selector: '.td_download_btn',
            relative: true,
        },
    },
    {
        page: 'https://viayoo.com/en/',
        href: {
            text: 'Download',
        },
    },
    {
        page: 'https://app.market.xiaomi.com/applinking/download?id=com.xiaomi.smarthome',
        href: {
            jsonPath: 'data',
        },
    },
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
                from: '//apk',
                to: 'https://apkw',
            },
        },
    },
]);
