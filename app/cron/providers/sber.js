import {request} from '@k03mad/request';

import {logError} from '../../../utils/logs.js';
import {getUa} from '../../../utils/request.js';

const REQUEST_URL = 'https://apps.sber.ru/apps/';
const requestOpts = () => ({headers: {'user-agent': getUa()}});

const RESPONSE_APP_PAGE_LINK_RE = /chpu":"(.+?)"/g;
const RESPONSE_APP_DOWNLOAD_LINK_RE = /[^"]+apk/g;

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default async () => {
    const {body: mainPageBody} = await request(REQUEST_URL, requestOpts());

    const appPageLinks = [...mainPageBody.matchAll(RESPONSE_APP_PAGE_LINK_RE)]
        .map(elem => elem?.[1]);

    const appDownloadLinks = await Promise.all(
        appPageLinks.filter(Boolean).map(async appPageLink => {
            try {
                const {body: appPageBody} = await request(
                    REQUEST_URL + appPageLink,
                    requestOpts(),
                );

                return appPageBody.match(RESPONSE_APP_DOWNLOAD_LINK_RE);
            } catch (err) {
                logError([appPageLink, err]);
            }
        }),
    );

    return [...new Set(appDownloadLinks.filter(Boolean).flat())]
        .filter(link => link.startsWith('http'))
        .map(link => ({link}));
};
