import fs from 'node:fs/promises';

import prettyBytes from 'pretty-bytes';

import {getDateYMD} from './date.js';
import {logError} from './logs.js';
import {run} from './shell.js';

/**
 * @param {string} apkFilePath
 */
export const getApkFileInfo = async apkFilePath => {
    let aapt, date, size, stat;

    try {
        aapt = await run(`aapt dump badging "${apkFilePath}"`);
    } catch (err) {
        aapt = err.stdout;
        logError(err);
    }

    try {
        stat = await fs.stat(apkFilePath);
        const [value, unit] = prettyBytes(stat.size, {maximumFractionDigits: 0}).split(' ');

        size = {value, unit, raw: stat.size};
    } catch (err) {
        logError(err);
    }

    try {
        const remoteDate = getDateYMD(stat.mtime);

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

    const version = aapt?.match(/versionName='(.+?)'/)?.[1]?.replace(/^\D+/, '');
    const pkg = aapt?.match(/name='(.+?)'/)?.[1];

    const nativeCode = aapt?.match(/native-code: '(.+)'/)?.[1];
    const arch = nativeCode?.split(/\s+|'/).filter(Boolean).sort().join(', ');

    return {label, version, pkg, arch, size, date};
};
