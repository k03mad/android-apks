import {getApkFromParse} from './parse.js';

const DEFAULT_OPTS = {
    page: 'https://www.tinkoff.ru/apps/',
    opts: {ua: 'mobile'},
    href: {
        re: /[^"]+apk/g,
        all: true,
    },
};

/**
 * @param {Array<{name: string}>} parse
 */
export const getApkFromTinkoff = parse => {
    const cloneOpts = structuredClone(DEFAULT_OPTS);

    cloneOpts.href.filter = {
        include: new RegExp(parse.map(({name}) => name).join('|'), 'i'),
    };

    return getApkFromParse([cloneOpts]);
};
