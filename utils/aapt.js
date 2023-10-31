import {run} from './shell.js';

/**
 * @param {string} apkFilePath
 * @returns {Promise<string>}
 */
export const aaptDumpBadging = apkFilePath => run(`aapt dump badging ${apkFilePath}`);

/**
 * @param {string} output
 */
export const aaptDumpBadgingParse = output => {
    const label = output?.match(/application-label-ru:'(.+)'/)?.[1]
               || output?.match(/application-label:'(.+)'/)?.[1];

    const version = output?.match(/versionName='(.+?)'/)?.[1];
    const name = output?.match(/name='(.+?)'/)?.[1];

    const nativeCode = output?.match(/native-code: '(.+)'/)?.[1];
    const arch = nativeCode?.split(/\s+|'/).filter(Boolean).sort().join(', ');

    return {label, version, name, arch};
};
