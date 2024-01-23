import {logError} from '@k03mad/simple-log';
import _debug from 'debug';

import {getUa, req} from '../../../../utils/request.js';

const debug = _debug('mad:parse');

/**
 * @param {Array<{
 * page: string,
 * opts: {ua: string, proxy: boolean},
 * errorName: string
 * href: {
 * re: RegExp,
 * filter: {include: RegExp, exclude: RegExp},
 * relative: boolean,
 * all: boolean,
 * replace: {from: string|RegExp, to: string}
 * },
 * }>} parse
 */
export const getApkFromParse = async parse => {
    const links = await Promise.all(parse.map(async ({
        page,
        opts,
        href,
        errorName,
    }) => {
        try {
            const {body} = await req(page, {
                headers: {
                    'user-agent': getUa(opts?.ua),
                },
            });

            let urls = (href.all ? [...new Set(body?.match(href.re))] : [body?.match(href.re)?.[1]])
                .filter(Boolean);

            if (urls.length === 0) {
                throw new Error(
                    `${errorName ? `[${errorName.toUpperCase()}]` : '[PARSE]'} `
                    + `No apk link found\n${page}\n${href}`,
                );
            }

            if (href.filter?.include) {
                urls = urls.filter(elem => href.filter.include.test(elem));
            }

            if (href.filter?.exclude) {
                urls = urls.filter(elem => !href.filter.exclude.test(elem));
            }

            return urls.map(url => {
                let link = href.relative ? new URL(url, page).href : url;

                if (href.replace) {
                    link = link.replaceAll(href.replace.from, href.replace.to);
                }

                debug.extend('link')('%o', link);
                return {homepage: page, link, opts};
            });
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};
