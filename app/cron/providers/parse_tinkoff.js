import {getApkFromParse} from './helpers/parse.js';

const common = {
    page: 'https://www.tbank.ru/apps/',
    opts: {
        ua: 'mobile',
    },
    href: {
        re: /[^"]+\.apk/g,
        all: true,
        filter: {
            exclude: /Pay_to|T_Business/,
        },
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
