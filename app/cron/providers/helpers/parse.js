import {logError} from '@k03mad/simple-log';
import _debug from 'debug';
import {JSDOM} from 'jsdom';
import _ from 'lodash';

import {convertToArray} from '../../../../utils/array.js';
import {getUa, req} from '../../../../utils/request.js';

const debug = _debug('mad:parse');

/**
 * @typedef intermediate
 * @property {RegExp} re
 * @property {boolean} all
 */

/**
 * @typedef opts
 * @property {string} ua
 * @property {boolean} proxy
 * @property {boolean} semVerRemovePatch
 */

/**
 * @typedef href
 * @property {RegExp} re
 * @property {string} selector
 * @property {string|RegExp} text
 * @property {string|RegExp} remove
 * @property {boolean} relative
 * @property {boolean} all
 * @property {string|string[]} jsonPath
 * @property {{file: boolean, include: RegExp, exclude: RegExp}} filter
 * @property {{from: string|RegExp, to: string}} replace
 */

/**
 * @param {Array<{page: string, intermediate: intermediate, opts: opts, href: href}>} parse
 */
export const getApkFromParse = async parse => {
    const links = await Promise.all(parse.map(async ({page, intermediate, opts, href}) => {
        try {
            let {body} = await req(page, {
                headers: {'user-agent': await getUa(opts?.ua)},
                https: {rejectUnauthorized: !opts?.skipSSL},
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
                        headers: {'user-agent': await getUa(opts?.ua)},
                        https: {rejectUnauthorized: !opts?.skipSSL},
                    });

                    return response.body;
                }));

                body = responses.join();
            }

            let apkLinks;

            if (href.selector) {
                const dom = new JSDOM(body);

                const hrefs = [
                    ...new Set(
                        [...dom.window.document.querySelectorAll(href.selector)]
                            .map(elem => elem.getAttribute('href')),
                    ),
                ];

                apkLinks = (href.all ? hrefs : [hrefs[0]]).filter(Boolean);
            } else if (href.text) {
                const dom = new JSDOM(body);

                const hrefs = [
                    ...new Set(
                        [...dom.window.document.querySelectorAll('[href]')]
                            .filter(elem => typeof href.text === 'string'
                                ? elem.textContent.includes(href.text)
                                : href.text.test(elem.textContent),
                            )
                            .map(elem => elem.getAttribute('href')),
                    ),
                ];

                apkLinks = (href.all ? hrefs : [hrefs[0]]).filter(Boolean);
            } else if (href.jsonPath) {
                apkLinks = [
                    ...new Set(
                        convertToArray(href.jsonPath).map(path => _.get(body, path)),
                    ),
                ].filter(Boolean);
            } else {
                apkLinks = (href.all
                    ? [...new Set(body?.match(href.re))]
                    : [body?.match(href.re)?.[1]]
                ).filter(Boolean);
            }

            if (apkLinks.length === 0) {
                throw new Error(`[PARSE] No apk link found\n${page}\n${JSON.stringify(href)}`);
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
                    fullLink = fullLink.replace(href.replace.from, href.replace.to);
                }

                if (href.remove) {
                    fullLink = fullLink.replace(href.remove, '');
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
