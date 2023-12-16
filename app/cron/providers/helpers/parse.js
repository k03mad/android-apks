import _debug from 'debug';

import {logError} from '../../../../utils/logs.js';
import {req} from '../../../../utils/request.js';

const debug = _debug('mad:parse');

/**
 * @param {object} parse
 * @param {string} parse.homepage
 * @param {object} parse.opts
 * @param {RegExp} parse.re
 * @param {boolean} parse.relative
 */
export const getApkFromParse = async parse => {
    const links = await Promise.all(parse.map(async ({homepage, opts, re, relative}) => {
        try {
            const {body} = await req(homepage);

            const url = body?.match(re)?.[1];
            const link = relative ? new URL(url, homepage).href : url;
            debug.extend('link')('%o', link);

            if (!link) {
                throw new Error(`No apk link found\n${homepage}\n${re}`);
            }

            return {link, opts, homepage};
        } catch (err) {
            logError(err);
        }
    }));

    return links.filter(Boolean);
};
