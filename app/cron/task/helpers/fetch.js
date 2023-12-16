import fs from 'node:fs/promises';
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
 * @param {object} [apk.opts]
 * @param {string} [apk.extraDir]
 * @param {string} [apk.homepage]
 * @param {string} apk.providerName
 * @param {string} [apk.obtainium]
 */
export const downloadApkFile = async ({extraDir = '', homepage, link, obtainium, opts, providerName}) => {
    const downloadedApkPath = await retry(
        () => download(link, {
            ...opts,
            ext: 'apk',
            dir: path.join(serverConfig.static.apk, providerName, extraDir),
        }),
    );

    const info = await getApkFileInfo(downloadedApkPath);

    const downloadedApkPathSplit = downloadedApkPath.split('/');
    const fileName = downloadedApkPathSplit.pop();
    const renamedFilePath = path.join(...downloadedApkPathSplit, `${info.pkg}_${info.version}.apk`);

    await fs.rename(downloadedApkPath, renamedFilePath);

    const relativeDownloadLink = renamedFilePath.replace(serverConfig.static.apk, '');

    return {...info, fileName, renamedFilePath, homepage, obtainium, origDownloadLink: link, relativeDownloadLink};
};
