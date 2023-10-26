import express from 'express';

import {getApkFilesInfo} from '../../../utils/aapt.js';
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
const getPageData = req => {
    const ua = req.headers?.['user-agent'];

    if (ua) {
        PAGE.ua.storage.add(ua);
    }

    if (PAGE.ua.storage.size > PAGE.ua.count) {
        PAGE.ua.storage.delete([...PAGE.ua.storage][0]);
    }

    return {
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
            const pageData = getPageData(req);
            const apkFiles = await getApkFilesInfo(config.static.apk);

            res.render('apps', {apkFiles, pageData});
        } catch (err) {
            next(err);
        }
    },
);
