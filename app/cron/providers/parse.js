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
        page: 'https://питание.дети/mobile',
        href: {
            selector: '.btn-success',
            remove: '\n',
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
        page: 'https://mobile.alfastrah.ru/',
        opts: {
            skipSSL: true,
        },
        href: {
            text: 'Скачать файл',
            relative: true,
        },
    },
    {
        page: 'https://apk.2gis.ru/',
        href: {
            selector: '._dl-store-apk',
        },
    },
    {
        page: 'https://app.yota.ru/',
        href: {
            text: 'APK-файла',
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
]);
