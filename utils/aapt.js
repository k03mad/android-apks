import fs from 'node:fs/promises';

import {getDateYMD} from '@k03mad/simple-date';
import {logError} from '@k03mad/simple-log';

import {run} from './shell.js';

/**
 * @param {string} apkFilePath
 * @param {object} opts
 */
export const getApkFileInfo = async (apkFilePath, opts = {}) => {
    let aapt, date, size, stat;

    try {
        const logs = await run(`aapt dump badging "${apkFilePath}"`);
        aapt = logs.stdout;
    } catch (err) {
        aapt = err.stdout;
        logError(err);
    }

    try {
        stat = await fs.stat(apkFilePath);

        size = {
            value: (stat.size / 1024 / 1024).toFixed(0),
            unit: 'MiB',
            raw: stat.size,
        };
    } catch (err) {
        logError(err);
    }

    try {
        const remoteDate = getDateYMD({init: stat.mtime});

        if (remoteDate !== getDateYMD()) {
            date = remoteDate;
        }
    } catch (err) {
        logError(err);
    }

    const label = (
        aapt?.match(/application-label-ru:'(.+)'/)?.[1]
        || aapt?.match(/application-label:'(.+)'/)?.[1]
    // &shy;
    )?.replace(/\u00AD/g, '');

    let version = aapt?.match(/versionName='(.+?)'/)?.[1]?.replace(/^v/, '');

    if (opts.semVerRemovePatch) {
        version = version?.split('.')?.slice(0, -1)?.join('.');
    }

    const pkg = aapt?.match(/name='(.+?)'/)?.[1];

    return {label, version, pkg, size, date};
};
