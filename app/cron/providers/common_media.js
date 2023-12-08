import {getApkFromParse} from './helpers/parse.js';

const direct = [
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
        homepage: 'https://televizo.net/',
        re: /href="(.+)">APK \(ALL DEVICES\)/,
    },
];

/** */
export default async () => {
    const parsed = await getApkFromParse(parse);
    return [direct, parsed].flat();
};
