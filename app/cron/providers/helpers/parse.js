import {logError} from '../../../../utils/logs.js';
import {req} from '../../../../utils/request.js';

/**
 * @param {object} parse
 * @param {string} parse.homepage
 * @param {object} parse.opts
 * @param {RegExp} parse.re
 * @param {boolean} parse.relative
 * @returns {Promise<Array<{link: string, opts: {ua: string, proxy: boolean}, homepage: string}>>}
 */
export const getApkFromParse = async parse => {
    const links = await Promise.all(parse.map(async ({homepage, opts, re, relative}) => {
        try {
            const {body} = await req(homepage);

            const url = body?.match(re)?.[1];
            const link = relative ? new URL(url, homepage) : url;

            return {link, opts, homepage};
        } catch (err) {
            logError(err);
        }
    }));

    return links.filter(Boolean);
};
