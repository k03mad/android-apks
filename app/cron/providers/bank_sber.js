import {request} from '@k03mad/request';

import {logError} from '../../../utils/logs.js';

const REQUEST_URL = 'https://apps.sber.ru/apps/';

const RESPONSE_APP_PAGE_LINK_RE = /chpu":"(.+?)"/g;
const RESPONSE_APP_DOWNLOAD_LINK_RE = /[^"]+apk/g;

const opts = {
    skipCheckCert: true,
};

/** */
export default async () => {
    const {body: mainPageBody} = await request(REQUEST_URL);

    const appPageLinks = [...mainPageBody.matchAll(RESPONSE_APP_PAGE_LINK_RE)]
        .map(elem => elem?.[1]);

    const appDownloadLinks = await Promise.all(
        appPageLinks.filter(Boolean).map(async appPageLink => {
            try {
                const {body: appPageBody} = await request(REQUEST_URL + appPageLink);
                return appPageBody.match(RESPONSE_APP_DOWNLOAD_LINK_RE);
            } catch (err) {
                logError([appPageLink, err]);
            }
        }),
    );

    return appDownloadLinks
        .flat()
        .filter(link => link?.startsWith('http'))
        .map(link => ({link, opts, homepage: REQUEST_URL}));
};
