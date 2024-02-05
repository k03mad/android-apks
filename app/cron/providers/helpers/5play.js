import _ from 'lodash';

import {getApkFromParse} from './parse.js';

const getUrlByName = name => `https://5play.org/${name}.html`;

const DEFAULT_OPTS = {
    opts: {ua: 'curl'},
    intermediate: {
        re: /href="(.+do=cdn&id=\d+)"/,
    },
    href: {
        re: /href="(.+\.apk)"/,
    },
};

/**
 * @param {Array<{
 * name: string,
 * page: string,
 * intermediate: {re: RegExp, all: boolean},
 * opts: {ua: string, proxy: boolean},
 * errorName: string
 * href: {re: RegExp, filter: {file: boolean, include: RegExp, exclude: RegExp}, relative: boolean, all: boolean, replace: {from: string|RegExp, to: string}}
 * }>} parse
 */
export const getApkFrom5Play = parse => getApkFromParse(
    parse.map(elem => {
        if (elem.name) {
            elem.page = getUrlByName(elem.name);
        }

        return _.merge(elem, structuredClone(DEFAULT_OPTS));
    }),
);
