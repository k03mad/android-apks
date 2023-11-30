import {getUa, req} from '../../../utils/request.js';
import {getApkFromAgIds} from './helpers/huawei.js';

const REQUEST_URL = 'https://yandex.ru/all';

const REQUEST_OPTS = {
    searchParams: {
        mode: 'apps',
    },
    headers: {
        'user-agent': getUa('mobile'),
    },
};

const RESPONSE_LINK_RE = /"https:\/\/appgallery.huawei.com(.+?)app\/(.+?)"/g;

/** */
export default async () => {
    const {body} = await req(REQUEST_URL, REQUEST_OPTS);

    const [...agApps] = body.matchAll(RESPONSE_LINK_RE);
    const agIds = agApps.map(link => link[2].replace(/\\|\?.+/, ''));

    return getApkFromAgIds(agIds)
        .map(elem => ({...elem, homepage: REQUEST_URL}));
};
