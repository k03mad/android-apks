import {logError} from '@k03mad/simple-log';
import _debug from 'debug';

import {req} from '../../../../utils/request.js';

const debug = _debug('mad:parse');

/**
 * @param {Array<{
 * page: string,
 * opts: object,
 * re: RegExp,
 * relative: boolean,
 * replace: {from: RegExp, to: string},
 * errorName: string
 * }>} parse
 */
export const getApkFromParse = async parse => {
    const links = await Promise.all(parse.map(async ({page, opts, re, relative, replace, errorName}) => {
        try {
            const {body} = await req(page);

            const url = body?.match(re)?.[1];
            let link = relative ? new URL(url, page).href : url;

            if (replace) {
                link = link.replaceAll(replace.from, replace.to);
            }

            debug.extend('link')('%o', link);

            if (!link) {
                throw new Error(
                    `${errorName ? `[${errorName.toUpperCase()}]` : '[PARSE]'} `
                    + `No apk link found\n${page}\n${re}`,
                );
            }

            return {homepage: page, link, opts};
        } catch (err) {
            logError(err);
        }
    }));

    return links.filter(elem => elem?.link);
};
