import {getApkFromParse} from './helpers/parse.js';

const common = {
    page: 'https://www.tinkoff.ru/apps/',
    opts: {
        ua: 'mobile',
    },
    href: {
        re: /[^"]+\.apk/g,
        all: true,
    },
};

/** */
export default () => getApkFromParse([
    common,
    {
        ...common,
        intermediate: {
            re: /href="(.+?t-bank.+?\.html)"/,
        },
    },
]);
