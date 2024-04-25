import {logError} from '@k03mad/simple-log';
import _debug from 'debug';

import {getUa, req} from '../../../../utils/request.js';

const debug = _debug('mad:parse');

/**
 * @param {Array<{
 * page: string,
 * intermediate: {re: RegExp, all: boolean},
 * opts: {ua: string, proxy: boolean},
 * errorName: string
 * href: {re: RegExp, filter: {file: boolean, include: RegExp, exclude: RegExp}, relative: boolean, all: boolean, replace: {from: string|RegExp, to: string}}
 * }>} parse
 */
export const getApkFromParse = async parse => {
    const links = await Promise.all(parse.map(async ({
        page,
        intermediate,
        opts,
        href,
        errorName,
    }) => {
        try {
            let {body} = await req(page, {
                headers: {'user-agent': getUa(opts?.ua)},
            });

            if (intermediate?.re) {
                const nextLinks = (
                    intermediate?.all
                        ? [...new Set(body?.match(intermediate.re))]
                        : [body?.match(intermediate.re)?.[1]]
                )
                    .filter(Boolean);

                debug.extend('nextLinks')('%o', nextLinks);

                const responses = await Promise.all(nextLinks.map(async nextLink => {
                    const response = await req(nextLink, {
                        headers: {'user-agent': getUa(opts?.ua)},
                    });

                    return response.body;
                }));

                body = responses.join();
            }

            let apkLinks = (href.all ? [...new Set(body?.match(href.re))] : [body?.match(href.re)?.[1]])
                .filter(Boolean);

            if (apkLinks.length === 0) {
                throw new Error(
                    `${errorName ? `[${errorName.toUpperCase()}]` : '[PARSE]'} `
                    + `No apk link found\n${page}\n${href}`,
                );
            }

            debug.extend('apkLinks')('%o', apkLinks);

            if (href.filter?.include) {
                apkLinks = apkLinks.filter(elem => href.filter?.file
                    ? href.filter?.include.test(elem.split('/').at(-1))
                    : href.filter?.include.test(elem),
                );
            }

            if (href.filter?.exclude) {
                apkLinks = apkLinks.filter(elem => href.filter?.file
                    ? !href.filter?.exclude.test(elem.split('/').at(-1))
                    : !href.filter?.exclude.test(elem),
                );
            }

            return apkLinks.map(link => {
                let fullLink = href.relative ? new URL(link, page).href : link;

                if (href.replace) {
                    fullLink = fullLink.replaceAll(href.replace.from, href.replace.to);
                }

                debug.extend('fullLink')('%o', fullLink);

                return {
                    // obtainium crashed with cyrillic domains
                    // URL auto converts them to punycode
                    homepage: new URL(page).href,
                    link: fullLink,
                    opts,
                };
            });
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};
