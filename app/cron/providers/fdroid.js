import {request} from '@k03mad/request';

const REQUEST_URL = 'https://f-droid.org/packages/';
const RESPONSE_LINK_RE = /[^"]+apk/g;

const packages = [
    'com.atharok.barcodescanner',
    'com.aurora.store',
    'com.foxdebug.acode',
    'eu.depau.etchdroid',
    'org.fdroid.fdroid',
    'org.jitsi.meet',
    'ws.xsoh.etar',
];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default async () => {
    const links = await Promise.all(packages.map(async pkg => {
        const {body} = await request(REQUEST_URL + pkg);
        return body?.match(RESPONSE_LINK_RE)?.find(link => link.includes(pkg));
    }));

    return [...new Set(links.filter(Boolean))].map(link => ({link}));
};
