import {getUa, req} from '../../../utils/request.js';

const REQUEST_URL = 'https://www.tinkoff.ru/apps/';

const REQUEST_OPTS = {
    headers: {
        'user-agent': getUa('mobile'),
    },
};

const RESPONSE_LINK_RE = /[^"]+apk/g;
const LINKS_INCLUDE_RE = /bank|invest|tinkoff_mobile/i;

/** */
export default async () => {
    const {body} = await req(REQUEST_URL, REQUEST_OPTS);

    const links = body.match(RESPONSE_LINK_RE);
    return [...new Set(links)]
        .filter(link => LINKS_INCLUDE_RE.test(link))
        .map(link => ({link, homepage: REQUEST_URL}));
};
