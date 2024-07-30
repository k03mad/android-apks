import {logError} from '@k03mad/simple-log';

import {req} from '../../../../utils/request.js';

const REQUEST_URL = 'https://f-droid.org/packages/';
const RESPONSE_LINK_RE = /[^"]+\.apk/g;

/**
 * @param {Array<{
 * name: string
 * opts: {ua: string, proxy: boolean, semVerRemovePatch: boolean}
 * }>} apps
 */
export const getApkFromFd = async apps => {
    const links = await Promise.all(apps.map(async ({name, opts}) => {
        try {
            const homepage = REQUEST_URL + name;

            const {body} = await req(homepage);
            const link = body?.match(RESPONSE_LINK_RE)?.find(href => href.includes(name));

            if (!link) {
                throw new Error(`[FDROID] No apk link found\n${homepage}`);
            }

            return {
                link,
                homepage,
                opts,
            };
        } catch (err) {
            logError(err);
        }
    }));

    return links.filter(elem => elem?.link);
};
