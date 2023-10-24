import fs from 'node:fs/promises';
import path from 'node:path';

import express from 'express';
import {globby} from 'globby';

import {getApkFilesInfo} from '../../../utils/aapt.js';
import {getNumberFromString} from '../../../utils/number.js';
import config from '../config.js';

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

    const folders = await globby(config.static.apk);

    const crons = await Promise.all(
        folders
            .filter(file => file.endsWith('.log'))
            .map(async file => ({
                folder: path.dirname(file.replace(config.static.apk, '')).replace(/^\//, ''),
                timestamp: await fs.readFile(file, {encoding: 'utf8'}),
            })),
    );

    return {
        crons: [...crons].sort((a, b) => getNumberFromString(b.timestamp) - getNumberFromString(a.timestamp)),
        texts: {
            header: PAGE.header,
        },
        visitors: {
            useragents: [...PAGE.ua.storage].sort(),
        },
    };
};

export default router.get(
    '/apps', async (req, res, next) => {
        try {
            const [pageData, apkFiles] = await Promise.all([
                getPageData(req),
                getApkFilesInfo(),
            ]);

            res.render('apps', {apkFiles, pageData});
        } catch (err) {
            next(err);
        }
    },
);
