import fs from 'node:fs/promises';

import express from 'express';

import {getApkFilesInfo} from '../../../utils/aapt.js';
import {logError} from '../../../utils/logs.js';
import cronConfig from '../../cron/config.js';
import serverConfig from '../config.js';

const router = express.Router();

const PAGE = {
    header: 'ANDROID APKS',
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

    let providersCount, timestamp;

    try {
        [timestamp, providersCount] = await Promise.all([
            fs.readFile(cronConfig.logs.timestamp.file, {encoding: 'utf8'}),
            fs.readFile(cronConfig.logs.providers.file, {encoding: 'utf8'}),
        ]);
    } catch (err) {
        logError(err);
    }

    return {
        texts: {
            header: PAGE.header,
            timestamp,
            providers: {count: providersCount},
        },
        visitors: {
            useragents: [...PAGE.ua.storage].sort(),
        },
    };
};

export default router.get(
    '/apps', async (req, res, next) => {
        try {
            const [data, files] = await Promise.all([
                getPageData(req),
                getApkFilesInfo(serverConfig.static.apk),
            ]);

            res.render('apps', {files, data});
        } catch (err) {
            next(err);
        }
    },
);
