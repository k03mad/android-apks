import {getApkFromAgIds} from './helpers/huawei.js';
import {getApkFromParse} from './helpers/parse.js';

const direct = [
    {
        link: 'https://disk.2gis.com/android/Latest/2GIS.apk',
        homepage: 'https://apk.2gis.ru/',
        opts: {ua: 'curl', proxy: true},
    },
];

const parse = [
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
