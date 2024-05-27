import fs from 'node:fs/promises';
import path from 'node:path';

import {logError} from '@k03mad/simple-log';
import _debug from 'debug';

import {getApkFileInfo} from '../../../../utils/aapt.js';
import {download} from '../../../../utils/aria.js';
import {convertToArray} from '../../../../utils/array.js';
import {retry} from '../../../../utils/promise.js';
import {run} from '../../../../utils/shell.js';
import serverConfig from '../../../server/config.js';
import cronConfig from '../../config.js';

const debug = _debug('mad:fetch');

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
 * @param {string} [apk.archive]
 */
export const downloadApkFile = async ({homepage, link, opts, archive}) => {
    let {downloadedApkPath, duration} = await retry(
        () => download(link, {
            ...opts,
            ext: archive || 'apk',
            dir: serverConfig.static.apk,
        }),
    );

    if (archive === 'zip') {
        const {stdout} = await run(`unzip ${downloadedApkPath} -d ${serverConfig.static.apk}`);
        await run(`rm ${downloadedApkPath}`);

        downloadedApkPath = stdout?.match(/inflating: (.+\.apk)/)?.[1];

        if (!downloadedApkPath) {
            throw new Error('[FETCH] Something went wrong with the archive unzip');
        }
    } else if (archive) {
        throw new Error(`[FETCH] Archive ext "${archive}" is not supported`);
    }

    const info = await getApkFileInfo(downloadedApkPath);

    const downloadedApkPathSplit = downloadedApkPath.split('/');
    const originalFileName = downloadedApkPathSplit.pop();

    const renamedFilePath = path.join(...downloadedApkPathSplit, `${info.pkg}_${info.version}.apk`);
    await fs.rename(downloadedApkPath, renamedFilePath);
    debug.extend('rename')('%o', renamedFilePath);

    const relativeDownloadLink = renamedFilePath.replace(serverConfig.static.root, '');

    if (
        !originalFileName?.endsWith('.apk')
        || info?.size?.raw < cronConfig.apk.minSizeB
    ) {
        throw new Error("[FETCH] Downloaded something that's not an apk file");
    }

    return {
        ...info,
        homepage,
        download: {
            original: link,
            mirror: relativeDownloadLink,
            duration,
            ...archive ? {archive} : {},
        },
    };
};
