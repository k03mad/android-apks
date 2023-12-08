import path from 'node:path';

import _ from 'lodash';

import {getApkFileInfo} from '../../../../utils/aapt.js';
import {download} from '../../../../utils/aria.js';
import {convertToArray} from '../../../../utils/array.js';
import {logError} from '../../../../utils/logs.js';
import {retry} from '../../../../utils/promise.js';
import serverConfig from '../../../server/config.js';

/**
 * @param {object} providers
 * @returns {Promise<Array<{providerName: string, link: string, opts: {ua: string, proxy: boolean}}>>}
 */
export const getProvidersData = async providers => {
    const data = await Promise.all(
        Object.entries(providers).map(async ([providerName, getProviderData]) => {
            try {
                const providerData = await retry(() => getProviderData());
                return convertToArray(providerData).map(elem => ({providerName, ...elem}));
            } catch (err) {
                logError([providerName, err]);
            }
        }),
    );

    const flattenProvidersData = data.flat().filter(Boolean);
    return _.uniqWith(flattenProvidersData, _.isEqual);
};

/**
 * @param {object} apk
 * @param {string} apk.link
 * @param {object} apk.opts
 * @param {string} apk.extraDir
 * @param {string} apk.homepage
 * @param {string} apk.providerName
 */
export const downloadApkFile = async ({extraDir = '', homepage, link, opts, providerName}) => {
    const downloadedApkPath = await retry(
        () => download(link, {
            ...opts,
            ext: 'apk',
            dir: path.join(serverConfig.static.apk, providerName, extraDir),
        }),
    );

    const info = await getApkFileInfo(downloadedApkPath);

    const fileName = downloadedApkPath.split('/').at(-1);
    const relativeDownloadLink = downloadedApkPath.replace(serverConfig.static.apk, '');

    return {...info, fileName, homepage, origDownloadLink: link, relativeDownloadLink};
};
