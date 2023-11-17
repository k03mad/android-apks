import {getUa, req} from '../../../utils/request.js';

const REQUEST_URL = 'https://www.tinkoff.ru/apps/';
const REQUEST_OPTS = {headers: {'user-agent': getUa('mobile')}};

const RESPONSE_LINK_RE = /[^"]+apk/g;

/** */
export default async () => {
    const {body} = await req(REQUEST_URL, REQUEST_OPTS);

    const links = body.match(RESPONSE_LINK_RE);
    return links.map(link => ({link, homepage: REQUEST_URL}));
};
