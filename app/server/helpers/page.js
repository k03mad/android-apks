import fs from 'node:fs/promises';

import cronConfig from '../../cron/config.js';

const userAgents = new Set();

/**
 * @param {object} [req]
 * @param {object} [req.headers]
 */
export const getPageData = async req => {
    const dataFile = await fs.readFile(cronConfig.output.data);
    const parsedData = JSON.parse(dataFile);

    const ua = req?.headers?.['user-agent'];

    if (ua) {
        userAgents.add(ua);
    }

    parsedData.ua = [...userAgents].sort();
    return parsedData;
};
