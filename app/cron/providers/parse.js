import {getApkFromParse} from './helpers/parse.js';

/** */
export default () => getApkFromParse([
    {
        page: 'https://download.wireguard.com/android-client/',
        re: /href="(.+\.apk)"/,
        relative: true,
    },
    {
        page: 'https://питание.дети/mobile',
        re: /href="(.{2,}apk)\s?"/,
    },
    {
        page: 'https://www.whatsapp.com/android',
        re: /href="(https:\/\/scontent.+)" data.+Android_PackageInstaller/,
        replace: {from: /&amp;/g, to: '&'},
    },
    {
        page: 'https://get.videolan.org/vlc-android/last/',
        re: /href="(.+arm64.+\.apk)"/,
        opts: {ua: 'curl'},
        relative: true,
    },
]);
