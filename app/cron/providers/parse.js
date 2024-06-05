import {getApkFromParse} from './helpers/parse.js';

/** */
export default () => getApkFromParse([
    {
        page: 'https://download.wireguard.com/android-client/',
        href: {
            re: /href="(.+\.apk)"/,
            relative: true,
        },
    },
    {
        page: 'https://питание.дети/mobile',
        href: {
            re: /href="(.{2,}apk)\s?"/,
        },
    },
    {
        page: 'https://www.whatsapp.com/android',
        opts: {
            ua: 'curl',
            semVerRemovePatch: true,
        },
        href: {
            re: /href="(https:\/\/scontent.+)" data.+Android_PackageInstaller/,
            replace: {from: '&amp;', to: '&'},
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
        page: 'https://www.tinkoff.ru/apps/',
        opts: {
            ua: 'mobile',
        },
        intermediate: {
            re: /href="(.+?t-bank.+?\.html)"/,
        },
        href: {
            re: /href="(.+\.apk)"/,
        },
    },
    {
        page: 'https://mobile.alfastrah.ru/',
        opts: {
            skipSSL: true,
        },
        href: {
            re: /href="(.+\.apk)"/,
            relative: true,
        },
    },
]);
