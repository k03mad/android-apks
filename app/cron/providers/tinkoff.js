import {request} from '@k03mad/request';

const REQUEST_URL = 'https://www.tinkoff.ru/apps/';

const RESPONSE_LINK_RE = /[^"]+apk/g;

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default async () => {
    const {body} = await request(REQUEST_URL);

    const links = body.match(RESPONSE_LINK_RE);
    return [...new Set(links)].map(link => ({link}));
};
