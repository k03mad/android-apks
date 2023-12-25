import {logError} from '../../../utils/logs.js';
import {req} from '../../../utils/request.js';

import {getApkFromAg} from './helpers/appgallery.js';

const REQUEST_URL = 'https://apps.sber.ru/apps/';

const RESPONSE_APP_PAGE_LINK_RE = /chpu":"(.+?)"/g;
const RESPONSE_APP_DOWNLOAD_LINK_RE = /[^"]+apk/g;

const RESPONSE_APP_EXCLUDE_RE = /sbermobile/;

const opts = {
    skipCheckCert: true,
};

const direct = [
    {
        link: 'https://sbermarket.ru/api/gw/app-configs/api/v1/mobile-applications/sbermarket.apk',
        homepage: 'https://sbermarket.ru/download',
    },
    {
        link: 'https://sbml.ru/r/android',
        homepage: 'https://sbermobile.ru/lk/',
    },
];

const agApps = [{name: 'Ситидрайв', id: 'C106367313'}];

/** */
export default async () => {
    const {body: mainPageBody} = await req(REQUEST_URL);

    const appPageLinks = [...mainPageBody.matchAll(RESPONSE_APP_PAGE_LINK_RE)]
        .map(elem => elem?.[1]);

    const appDownloadLinks = await Promise.all(
        appPageLinks
            .filter(appPageLink => Boolean(appPageLink) && !RESPONSE_APP_EXCLUDE_RE.test(appPageLink))
            .map(async appPageLink => {
                try {
                    const {body: appPageBody} = await req(REQUEST_URL + appPageLink);
                    return appPageBody.match(RESPONSE_APP_DOWNLOAD_LINK_RE);
                } catch (err) {
                    logError([appPageLink, err]);
                }
            }),
    );

    const links = [...new Set(appDownloadLinks.flat())]
        .filter(link => link?.startsWith('http'))
        .map(link => ({link, opts, homepage: REQUEST_URL}));

    const ag = getApkFromAg(agApps);

    return [links, ag, direct].flat();
};
