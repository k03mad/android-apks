import {request} from '@k03mad/request';

import {getUa} from '../../../utils/request.js';

const REQUEST_URL = 'https://www.tinkoff.ru/apps/';
const REQUEST_OPTS = {headers: {'user-agent': getUa('mobile')}};

const RESPONSE_LINK_RE = /[^"]+apk/g;

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default async () => {
    const {body} = await request(REQUEST_URL, REQUEST_OPTS);

    const links = body.match(RESPONSE_LINK_RE);
    return [...new Set(links)].map(link => ({link}));
};
