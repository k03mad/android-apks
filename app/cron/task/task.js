import fs from 'node:fs/promises';

import _debug from 'debug';
import _ from 'lodash';
import pMap from 'p-map';

import {logError} from '../../../utils/logs.js';
import serverConfig from '../../server/config.js';
import cronConfig from '../config.js';
import {downloadApkFile, getProvidersData} from './helpers/fetch.js';
import {getTimestamp, sortData} from './helpers/json.js';

const debug = _debug('mad:task');

/**
 * @param {object} providers
 * @param {boolean} skipClean
 */
export default async (providers, skipClean) => {
    const startDate = new Date();
    const providersData = await getProvidersData(providers);

    if (!skipClean) {
        await fs.rm(serverConfig.static.apk, {force: true, recursive: true});
    }

    const json = {
        apk: {},
        errors: [],
    };

    let counter = 0;

    await pMap(
        _.shuffle(providersData),

        async providerData => {
            try {
                counter++;

                const {link, providerName} = providerData;

                const debugOpts = ['[%o/%o] %o', counter, providersData.length, link];
                debug.extend('started')(...debugOpts);
                const apk = await downloadApkFile(providerData);
                debug.extend('finished')(...debugOpts);

                if (!apk.fileName?.endsWith('.apk')) {
                    throw new Error('Downloaded not apk file');
                }

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

    sortData(json);
    json.timestamp = getTimestamp(startDate);

    await fs.writeFile(cronConfig.json.file, JSON.stringify(json));
};
