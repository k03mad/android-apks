import fs from 'node:fs/promises';

import {logError} from '@k03mad/simple-log';
import _debug from 'debug';
import pMap from 'p-map';

import {shuffle} from '../../../utils/array.js';
import serverConfig from '../../server/config.js';
import cronConfig from '../config.js';

import {downloadApkFile, getProvidersData} from './helpers/fetch.js';
import {addObtainiumLinks, getRequestErrorsArray, getTimestamp, sortData} from './helpers/json.js';

const debug = _debug('mad:task');

/**
 * @param {object} providers
 */
export default async providers => {
    const startDate = new Date();

    const [providersData] = await Promise.all([
        getProvidersData(providers),
        fs.rm(cronConfig.output.errors, {force: true, recursive: true}),
        fs.rm(serverConfig.static.apk, {force: true, recursive: true}),
    ]);

    const json = {
        apk: {},
        errors: await getRequestErrorsArray() || [],
    };

    await pMap(
        shuffle(providersData),

        async (providerData, counter) => {
            try {
                const {link, providerName} = providerData;

                const debugOpts = ['[%o/%o] %o', counter + 1, providersData.length, link];
                debug.extend('started')(...debugOpts);
                const apk = await downloadApkFile(providerData);
                debug.extend('finished')(...debugOpts);

                if (json.apk[providerName]) {
                    json.apk[providerName].push(apk);
                } else {
                    json.apk[providerName] = [apk];
                }
            } catch (err) {
                try {
                    json.errors.push(providerData.link);
                } catch (err_) {
                    logError(err_);
                }

                logError(err);
            }
        },

        {concurrency: cronConfig.download.concurrency},
    );

    let data = sortData(json);
    data = addObtainiumLinks(data);
    data.timestamp = getTimestamp(startDate);

    await fs.mkdir(cronConfig.output.folder, {recursive: true});
    await fs.writeFile(cronConfig.output.data, JSON.stringify(data));
};
