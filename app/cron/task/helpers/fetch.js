import fs from 'node:fs/promises';
import path from 'node:path';

import {getApkFileInfo} from '../../../../utils/aapt.js';
import {download} from '../../../../utils/aria.js';
import {convertToArray} from '../../../../utils/array.js';
import {logError} from '../../../../utils/logs.js';
import {retry} from '../../../../utils/promise.js';
import serverConfig from '../../../server/config.js';
import cronConfig from '../../config.js';

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

    return data.flat().filter(Boolean);
};

/**
 * @param {object} apk
 * @param {string} apk.link
 * @param {object} [apk.opts]
 * @param {string} [apk.homepage]
 */
export const downloadApkFile = async ({homepage, link, opts}) => {
    const {downloadedApkPath, durationSeconds} = await retry(
        () => download(link, {
            ...opts,
            ext: 'apk',
            dir: serverConfig.static.apk,
        }),
    );

    const info = await getApkFileInfo(downloadedApkPath);

    const downloadedApkPathSplit = downloadedApkPath.split('/');
    const originalFileName = downloadedApkPathSplit.pop();

    const renamedFilePath = path.join(...downloadedApkPathSplit, `${info.pkg}_${info.version}.apk`);
    await fs.rename(downloadedApkPath, renamedFilePath);

    const relativeDownloadLink = renamedFilePath.replace(serverConfig.static.root, '');

    if (
        !originalFileName?.endsWith('.apk')
        || info?.size?.raw < cronConfig.apk.minSizeB
    ) {
        throw new Error('Downloaded not apk file');
    }

    return {
        ...info,
        homepage,
        download: {
            original: link,
            mirror: relativeDownloadLink,
            duration: durationSeconds,
        },
    };
};
