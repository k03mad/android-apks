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
        opts: {ua: 'curl'},
        href: {
            re: /href="(https:\/\/scontent.+)" data.+Android_PackageInstaller/,
            replace: {from: '&amp;', to: '&'},
        },
    },
    {
        page: 'https://get.videolan.org/vlc-android/last/',
        opts: {ua: 'curl'},
        href: {
            re: /href="(.+arm64.+\.apk)"/,
            relative: true,
        },
    },
    {
        page: 'https://android.zona.pub/download.html',
        href: {
            re: /href="(.+\.apk)"/,
            replace: {from: '//', to: 'https://'},
        },
    },
    {
        page: 'https://www.tinkoff.ru/apps/',
        opts: {ua: 'mobile'},
        href: {
            re: /[^"]+apk/g,
            all: true,
            filter: {include: /bank|invest|tinkoff_mobile/i},
        },
    },
    {
        page: 'https://5play.org/4159-vampire-survivors.html',
        opts: {ua: 'curl'},
        intermediate: {
            re: /href="(.+do=cdn&id=\d+)"/,
        },
        href: {
            re: /href="(.+\.apk)"/,
        },
    },
]);
