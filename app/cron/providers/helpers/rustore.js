import {logError} from '@k03mad/simple-log';

import {getSelectorHrefs} from '../../../../utils/dom.js';
import {req} from '../../../../utils/request.js';

const rps = 1;

/**
 * @param {string} pkg
 * @returns {string}
 */
const getAppWebLink = pkg => `https://www.rustore.ru/catalog/app/${pkg}`;

/**
 * @param {string} pkg
 * @returns {Promise<number>}
 */
const getAppId = async pkg => {
    const {body} = await req(`https://backapi.rustore.ru/applicationData/overallInfo/${pkg}`, {}, {rps});
    return body.body.appId;
};

/**
 * @param {number} appId
 * @returns {Promise<string>}
 */
const getAppDownloadLink = async appId => {
    const {body} = await req('https://backapi.rustore.ru/applicationData/download-link', {
        method: 'POST',
        json: {
            appId,
            firstInstall: true,
        },
    }, {rps});

    return body.body.apkUrl;
};

/**
 * @param {string} dev
 * @returns {Promise<Array<string>>}
 */
const getDevPkgs = async dev => {
    const {body} = await req(`https://www.rustore.ru/catalog/developer/${dev}`, {
        followRedirect: false,
    }, {rps});

    return getSelectorHrefs(body, '[data-testid="AppCardLink"]')
        .map(href => href.split('/').pop());
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
            const link = await getAppDownloadLink(appId);

            return {
                link,
                homepage: getAppWebLink(name),
                opts,
            };
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};

/**
 * @param {Array<{
 * name: string
 * opts: {ua: string, proxy: boolean, semVerRemovePatch: boolean}
 * }>} devs
 */
export const getApkFromRsDev = async devs => {
    const links = await Promise.all(devs.map(async ({name, opts}) => {
        const pkgs = await getDevPkgs(name);
        return getApkFromRs(pkgs.map(pkg => ({name: pkg, opts})));
    }));

    return links.flat();
};
