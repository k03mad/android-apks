import fs from 'node:fs/promises';

import pMap from 'p-map';

import {download} from '../../../utils/aria.js';
import {convertToArray} from '../../../utils/array.js';
import {logError} from '../../../utils/logs.js';
import serverConfig from '../../server/config.js';
import cronConfig from '../config.js';

/**
 * @param {object} providers
 */
export const getData = async providers => await Promise.all(
    Object.entries(providers).map(async ([providerName, getProviderData]) => {
        try {
            const providerData = await getProviderData();
            return convertToArray(providerData).map(elem => ({providerName, ...elem}));
        } catch (err) {
            logError([providerName, err]);
        }
    }),
);

/**
 * @param {Array<{link: string, opts: {ua: string}}>} providersData
 */
export const downloadApk = async providersData => {
    await fs.rm(serverConfig.static.apk, {force: true, recursive: true});

    await pMap(
        providersData.filter(Boolean).flat(),

        async ({link, opts, providerName}) => {
            try {
                await download(`${serverConfig.static.apk}/${providerName}`, link, opts);
            } catch (err) {
                logError([providerName, link, err]);
            }
        },

        {concurrency: cronConfig.download.concurrency},
    );
};
