import {req} from '../../../../utils/request.js';

const REQUEST_URL = 'https://f-droid.org/packages/';
const RESPONSE_LINK_RE = /[^"]+apk/g;

/**
 * @param {Array<string>} packages
 * @returns {Promise<Array<{link: string, homepage: string}>>}
 */
export const getApkFromFdPackages = async packages => {
    const links = await Promise.all(packages.map(async pkg => {
        const homepage = REQUEST_URL + pkg;

        const {body} = await req(homepage);
        const link = body?.match(RESPONSE_LINK_RE)?.find(href => href.includes(pkg));
        return {link, homepage};
    }));

    return links.filter(elem => elem.link);
};
