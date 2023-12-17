import fs from 'node:fs/promises';

import express from 'express';

import cronConfig from '../../cron/config.js';
import serverConfig from '../../server/config.js';

const router = express.Router();
const userAgents = new Set();

let modTime, parsedData;

/**
 * @param {object} req
 * @param {object} [req.headers]
 */
const getPageData = async req => {
    const {mtime} = await fs.stat(cronConfig.json.file);

    if (String(mtime) !== String(modTime)) {
        const dataFile = await fs.readFile(cronConfig.json.file);

        parsedData = JSON.parse(dataFile);
        // eslint-disable-next-line require-atomic-updates
        modTime = mtime;
    }

    const ua = req.headers?.['user-agent'];

    if (ua) {
        userAgents.add(ua);
    }

    parsedData.ua = [...userAgents].sort();
    return parsedData;
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
