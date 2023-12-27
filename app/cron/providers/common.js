import {getApkFromAp} from './helpers/apkpure.js';
import {getApkFromAg} from './helpers/appgallery.js';
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
        re: /href="(.+\.apk)"/,
        relative: true,
    },
    {
        homepage: 'https://televizo.net/',
        re: /href="(.+)">APK \(ALL DEVICES\)/,
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
];

const apApps = [{path: 'mi-home/com.xiaomi.smarthome'}];

const agApps = [{name: 'РЖД', id: 'C101979029'}];

/** */
export default async () => {
    const parsed = await getApkFromParse(parse);
    const ap = getApkFromAp(apApps);
    const ag = getApkFromAg(agApps);

    return [direct, parsed, ap, ag].flat();
};
