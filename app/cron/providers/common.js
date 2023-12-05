import {getApkFromAgIds} from './helpers/huawei.js';
import {getApkFromParse} from './helpers/parse.js';

const direct = [
    {
        link: 'https://disk.2gis.com/android/Latest/2GIS.apk',
        homepage: 'https://apk.2gis.ru/',
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

const agIds = [
    // ru.rzd.pass
    'C101979029',
];

/** */
export default async () => {
    const parsed = await getApkFromParse(parse);
    const ag = getApkFromAgIds(agIds);

    return [direct, parsed, ag].flat();
};
