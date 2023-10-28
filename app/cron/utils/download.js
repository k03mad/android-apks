import fs from 'node:fs/promises';

import _ from 'lodash';
import moment from 'moment';
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
 * @param {object} providers
 * @param {boolean} skipClean
 */
export const downloadApk = async (providers, skipClean) => {
    const start = Date.now();

    const providersData = await getData(providers);

    if (!skipClean) {
        await fs.rm(serverConfig.static.apk, {force: true, recursive: true});
    }

    await pMap(
        _.shuffle(providersData.filter(Boolean).flat()),

        async ({link, opts, providerName}) => {
            try {
                const folder = `${serverConfig.static.apk}/${providerName}`;
                const file = await download(folder, link, opts);
                await fs.writeFile(`${folder}/${file.split('/').at(-1)}.log`, link);
            } catch (err) {
                logError([providerName, link, err]);
            }
        },

        {concurrency: cronConfig.download.concurrency},
    );

    const timestamp = `${moment(start).format(cronConfig.logs.timestamp.format.full)} `
                    + `${(Date.now() - start) / 1000}s`;

    await fs.mkdir(cronConfig.logs.folder, {recursive: true});

    await Promise.all([
        fs.writeFile(cronConfig.logs.timestamp.file, timestamp),
        fs.writeFile(cronConfig.logs.providers.file, String(providersData.flat().length)),
    ]);
};
