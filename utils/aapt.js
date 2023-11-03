import fs from 'node:fs/promises';

import prettyBytes from 'pretty-bytes';

import {logError} from './logs.js';
import {run} from './shell.js';

/**
 * @param {string} apkFilePath
 */
export const getApkFileInfo = async apkFilePath => {
    let aapt, size;

    try {
        aapt = await run(`aapt dump badging ${apkFilePath}`);
    } catch (err) {
        aapt = err.stdout;
    }

    try {
        const stat = await fs.stat(apkFilePath);
        size = prettyBytes(stat.size, {maximumFractionDigits: 0}).split(' ');
    } catch (err) {
        logError(err);
    }

    const label = aapt?.match(/application-label-ru:'(.+)'/)?.[1]
               || aapt?.match(/application-label:'(.+)'/)?.[1];

    const version = aapt?.match(/versionName='(.+?)'/)?.[1];
    const pkg = aapt?.match(/name='(.+?)'/)?.[1];

    const nativeCode = aapt?.match(/native-code: '(.+)'/)?.[1];
    const arch = nativeCode?.split(/\s+|'/).filter(Boolean).sort().join(', ');

    return {label, version, pkg, arch, size};
};
