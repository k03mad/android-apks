import fs from 'node:fs/promises';

import express from 'express';
import {globby} from 'globby';
import prettyBytes from 'pretty-bytes';

import {aaptDumpBadging, aaptDumpBadgingParse} from '../../../utils/aapt.js';
import {logError} from '../../../utils/logs.js';
import cronConfig from '../../cron/config.js';
import serverConfig from '../config.js';

const router = express.Router();

const PAGE = {
    ua: {
        count: 100,
        storage: new Set(),
    },
};

/**
 * @param {object} req
 * @param {object} [req.headers]
 */
const getPageData = async req => {
    const ua = req.headers?.['user-agent'];

    if (ua) {
        PAGE.ua.storage.add(ua);
    }

    if (PAGE.ua.storage.size > PAGE.ua.count) {
        PAGE.ua.storage.delete([...PAGE.ua.storage][0]);
    }

    let errorLinks, providersCount, timestamp;

    try {
        [timestamp, providersCount] = await Promise.all([
            fs.readFile(cronConfig.logs.timestamp.file, {encoding: 'utf8'}),
            fs.readFile(cronConfig.logs.providers.file, {encoding: 'utf8'}),
        ]);
    } catch (err) {
        logError(err);
    }

    try {
        const errorLogs = await globby(cronConfig.logs.errors.download.folder);
        errorLinks = await Promise.all(errorLogs.map(log => fs.readFile(log, {encoding: 'utf8'})));
    } catch (err) {
        logError(err);
    }

    return {
        texts: {
            header: PAGE.header,
            timestamp,
            providers: {count: providersCount, errorLinks},
        },
        visitors: {
            useragents: [...PAGE.ua.storage].sort(),
        },
    };
};

/**
 * @param {string} folder
 * @returns {Promise<{
 * apk: {
 * label: string, version: string, name: string, arch: string,
 * relativePath: string, file: string, provider: string, orig: string, size: string
 * },
 * count: number
 * }>}
 */
const getApkFilesInfo = async folder => {
    const paths = await globby(folder);

    const data = await Promise.all(
        paths
            .sort((a, b) => a.localeCompare(b))
            .filter(elem => elem.endsWith('.apk'))
            .map(async path => {
                let orig, output, size;

                try {
                    output = await aaptDumpBadging(path);
                } catch (err) {
                    output = err.stdout;
                }

                try {
                    const stat = await fs.stat(path);
                    size = prettyBytes(stat.size, {maximumFractionDigits: 0}).replace(' ', ' ');
                } catch (err) {
                    logError(err);
                }

                try {
                    orig = await fs.readFile(`${path}.log`);
                } catch (err) {
                    logError(err);
                }

                const relativePath = path.replace(serverConfig.static.root, '');
                const splitted = path.split('/');

                const file = splitted.at(-1);
                const provider = `./${splitted.at(-2).replace(/_\d+_/, '').replaceAll('_', '/')}`;

                return {
                    relativePath, file, provider, orig, size,
                    ...aaptDumpBadgingParse(output),
                };
            }),
    );

    const byProvider = {};

    data.forEach(elem => {
        if (byProvider[elem.provider]) {
            byProvider[elem.provider].push(elem);
        } else {
            byProvider[elem.provider] = [elem];
        }
    });

    for (const elem in byProvider) {
        byProvider[elem].sort((a, b) => a?.label?.localeCompare(b?.label));
    }

    return {apk: byProvider, count: data.length};
};

export default router.get(
    '/apps', async (req, res, next) => {
        try {
            const [data, files] = await Promise.all([
                getPageData(req),
                getApkFilesInfo(serverConfig.static.apk),
            ]);

            res.render('apps', {data, files});
        } catch (err) {
            next(err);
        }
    },
);
