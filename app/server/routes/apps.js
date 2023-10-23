import express from 'express';

import {getApkFilesInfo} from '../../../utils/aapt.js';

const router = new express.Router();

const PAGE = {
    header: 'ANDROID APKS',
    timestamps: {
        count: 10,
        storage: [],
    },
    ua: {
        count: 100,
        storage: new Set(),
    },
};

/**
 * @param {object} req
 * @param {object} [req.headers]
 * @returns {Promise<{
 * texts: {header: string},
 * visitors: {timestamps: Array<string>, useragents: Array<string>}
 * }>}
 */
const getPageData = req => {
    const ua = req.headers?.['user-agent'];

    if (ua) {
        PAGE.ua.storage.add(ua);
    }

    if (PAGE.ua.storage.size > PAGE.ua.count) {
        PAGE.ua.storage.delete([...PAGE.ua.storage][0]);
    }

    PAGE.timestamps.storage.push(new Date().toISOString());

    if (PAGE.timestamps.storage.length > PAGE.timestamps.count) {
        PAGE.timestamps.storage.splice(0, 1);
    }

    return {
        texts: {
            header: PAGE.header,
        },
        visitors: {
            timestamps: [...PAGE.timestamps.storage].reverse(),
            useragents: [...PAGE.ua.storage].sort(),
        },
    };
};

export default router.get(
    '/apps', async (req, res, next) => {
        try {
            const pageData = getPageData(req);
            const apkFiles = await getApkFilesInfo();

            res.render('apps', {apkFiles, pageData});
        } catch (err) {
            next(err);
        }
    },
);
