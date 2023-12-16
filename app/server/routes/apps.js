import fs from 'node:fs/promises';

import express from 'express';

import cronConfig from '../../cron/config.js';
import serverConfig from '../../server/config.js';

const router = express.Router();
const userAgents = new Set();

/**
 * @param {object} req
 * @param {object} [req.headers]
 */
const getPageData = async req => {
    const dataFile = await fs.readFile(cronConfig.json.file);
    const data = JSON.parse(dataFile);

    const ua = req.headers?.['user-agent'];

    if (ua) {
        userAgents.add(ua);
    }

    data.ua = [...userAgents].sort();
    return data;
};

export default router.get(
    `/${serverConfig.url.appsPath}`, async (req, res, next) => {
        try {
            const data = await getPageData(req);
            res.render(serverConfig.url.appsPath, data);
        } catch (err) {
            next(err);
        }
    },
);
