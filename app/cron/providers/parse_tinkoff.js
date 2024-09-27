import {getApkFromParse} from './helpers/parse.js';

/** */
export default () => getApkFromParse([
    {
        page: 'https://www.tbank.ru/apps/',
        opts: {
            ua: 'mobile',
        },
        href: {
            re: /[^"]+\.apk/g,
            all: true,
        },
    },
]);
