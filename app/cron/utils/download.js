import fs from 'node:fs/promises';

import moment from 'moment';
import ms from 'ms';
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
 */
export const downloadApk = async providers => {
    const start = Date.now();

    const providersData = await getData(providers);

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

    const finish = Date.now();

    const timestamp = `${moment(start).format(cronConfig.logs.timestamp.format.full)}-`
                    + `${moment(start).format(cronConfig.logs.timestamp.format.time)} `
                    + `${ms(finish - start)}`;

    await fs.mkdir(cronConfig.logs.folder, {recursive: true});
    await fs.writeFile(cronConfig.logs.timestamp.file, timestamp);
};
