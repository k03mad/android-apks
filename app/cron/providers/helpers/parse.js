import {logError} from '@k03mad/simple-log';
import _debug from 'debug';

import {getUa, req} from '../../../../utils/request.js';

const debug = _debug('mad:parse');

/**
 * @param {Array<{
 * page: string,
 * opts: {ua: string, proxy: boolean},
 * errorName: string
 * href: {re: RegExp, filter: {file: boolean, include: RegExp, exclude: RegExp}, relative: boolean, all: boolean, replace: {from: string|RegExp, to: string}}
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

            let apkLinks = (href.all ? [...new Set(body?.match(href.re))] : [body?.match(href.re)?.[1]])
                .filter(Boolean);

            if (apkLinks.length === 0) {
                throw new Error(
                    `${errorName ? `[${errorName.toUpperCase()}]` : '[PARSE]'} `
                    + `No apk link found\n${page}\n${href}`,
                );
            }

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
                return {homepage: page, link: fullLink, opts};
            });
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};
