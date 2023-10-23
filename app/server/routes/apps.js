import express from 'express';

import {PAGE} from '../../../config.js';
import {getApkFilesInfo} from '../../../utils/aapt.js';

const router = new express.Router();

const timestamps = [];
const useragents = new Set();

/**
 * @param {object} req
 * @returns {Promise<{
 *      links: {main: string},
 *      visitors: {timestamps: Array<string>, useragents: Array<string>}
 * }>}
 */
const getPageData = req => {
    const ua = req.headers?.['user-agent'];

    ua && useragents.add(ua);
    useragents.size > PAGE.ua && useragents.delete([...useragents][0]);

    timestamps.push(new Date().toISOString());
    timestamps.length > PAGE.timestamps && timestamps.splice(0, 1);

    return {
        texts: {
            header: PAGE.header,
        },
        visitors: {
            timestamps: [...timestamps].reverse(),
            useragents: [...useragents].sort(),
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
