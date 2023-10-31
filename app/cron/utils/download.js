import fs from 'node:fs/promises';

import _debug from 'debug';
import _ from 'lodash';
import moment from 'moment';
import ms from 'ms';
import {nanoid} from 'nanoid';
import pMap from 'p-map';

import {download} from '../../../utils/aria.js';
import {convertToArray} from '../../../utils/array.js';
import {retry} from '../../../utils/fn.js';
import {logError} from '../../../utils/logs.js';
import serverConfig from '../../server/config.js';
import cronConfig from '../config.js';

const debug = _debug('mad:download');

/**
 * @param {object} providers
 */
export const getData = async providers => await Promise.all(
    Object.entries(providers).map(async ([providerName, getProviderData]) => {
        try {
            const providerData = await retry(() => getProviderData());
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

    await fs.mkdir(cronConfig.logs.folder, {recursive: true});
    await fs.rm(cronConfig.logs.folder, {recursive: true});
    await fs.mkdir(cronConfig.logs.folder, {recursive: true});
    await fs.writeFile(cronConfig.logs.providers.file, String(providersData.flat().length));

    if (!skipClean) {
        await fs.rm(serverConfig.static.apk, {force: true, recursive: true});
    }

    let counter = 0;

    const providersFormatted = _.shuffle(providersData.filter(Boolean).flat());

    await pMap(
        providersFormatted,

        async ({link, opts, providerName}) => {
            let file;

            try {
                const folder = `${serverConfig.static.apk}/${providerName}`;
                file = await retry(() => download(folder, link, opts));
                await fs.writeFile(`${folder}/${file.split('/').at(-1)}.log`, link);

                counter++;
                debug('%o/%o', counter, providersFormatted.length);
            } catch (err) {
                try {
                    await fs.mkdir(cronConfig.logs.errors.download.folder, {recursive: true});
                    await fs.writeFile(`${cronConfig.logs.errors.download.folder}/${nanoid()}.log`, link);
                } catch (err_) {
                    logError(err_);
                }

                logError(err);
            }
        },

        {concurrency: cronConfig.download.concurrency},
    );

    const timestamp = [
        moment(start).format(cronConfig.logs.timestamp.format.full),
        ms(Date.now() - start),
    ].join(' ');

    await fs.writeFile(cronConfig.logs.timestamp.file, timestamp);
};
