import {logError} from '@k03mad/simple-log';

import {req} from '../../../../utils/request.js';

const urls = {
    web: pkg => `https://www.rustore.ru/catalog/app/${pkg}`,
    api: {
        info: pkg => `https://backapi.rustore.ru/applicationData/overallInfo/${pkg}`,
        download: appId => [
            'https://backapi.rustore.ru/applicationData/download-link',
            {
                method: 'POST',
                json: {
                    appId,
                    firstInstall: true,
                },
            },
        ],
    },
};

/**
 * @param {string} pkg
 * @returns {Promise<number>}
 */
const getAppId = async pkg => {
    const {body} = await req(urls.api.info(pkg));
    return body.body.appId;
};

/**
 * @param {number} appId
 * @returns {Promise<string>}
 */
const getDownloadLink = async appId => {
    const {body} = await req(...urls.api.download(appId));
    return body.body.apkUrl;
};

/**
 * @param {Array<{
 * name: string
 * opts: {ua: string, proxy: boolean, semVerRemovePatch: boolean}
 * }>} apps
 */
export const getApkFromRs = async apps => {
    const links = await Promise.all(apps.map(async ({name, opts = {}}) => {
        try {
            const appId = await getAppId(name);
            const link = await getDownloadLink(appId);

            return {
                link,
                homepage: urls.web(name),
                opts,
            };
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};
