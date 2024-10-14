import {getApkFromParse} from './helpers/parse.js';

/** */
export default () => getApkFromParse([
    {
        page: 'https://www.tbank.ru/apps/android-invest/',
        href: {selector: '[href$=".apk"]'},
    },
    {
        page: 'https://www.tbank.ru/apps/android-mobile/',
        href: {selector: '[href$=".apk"]'},
    },
    {
        page: 'https://www.tbank.ru/apps/android-bank/',
        intermediate: {selector: '[href*="download"]'},
        href: {selector: '[href$=".apk"]'},
    },
]);
