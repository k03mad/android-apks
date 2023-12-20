import {logError} from '../../../../utils/logs.js';
import {req} from '../../../../utils/request.js';

const REQUEST_URL = 'https://f-droid.org/packages/';
const RESPONSE_LINK_RE = /[^"]+apk/g;

/**
 * @param {Array<string>} packages
 */
export const getApkFromFdPackages = async packages => {
    const links = await Promise.all(packages.map(async pkg => {
        try {
            const homepage = REQUEST_URL + pkg;

            const {body} = await req(homepage);
            const link = body?.match(RESPONSE_LINK_RE)?.find(href => href.includes(pkg));

            return {
                link,
                homepage,
            };
        } catch (err) {
            logError(err);
        }
    }));

    return links.filter(elem => elem.link);
};
