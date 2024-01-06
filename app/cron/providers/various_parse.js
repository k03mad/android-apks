import {getApkFromParse} from './helpers/parse.js';

/** */
export default () => getApkFromParse([
    {
        homepage: 'https://download.wireguard.com/android-client/',
        re: /href="(.+\.apk)"/,
        relative: true,
    },
    {
        homepage: 'https://питание.дети/mobile',
        re: /href="(.{2,}apk)\s?"/,
    },
    {
        homepage: 'https://www.whatsapp.com/android',
        re: /href="(https:\/\/scontent.+)" data.+Android_PackageInstaller/,
        replace: {from: /&amp;/g, to: '&'},
    },
    {
        homepage: 'https://get.videolan.org/vlc-android/last/',
        re: /href="(.+arm64.+\.apk)"/,
        opts: {ua: 'curl'},
        relative: true,
    },
]);
