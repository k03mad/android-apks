import {globby} from 'globby';

import config from '../app/server/config.js';
import {run} from './shell.js';

/**
 * @param {string} filePath
 * @returns {Promise<string>}
 */
const aaptDumpBadging = filePath => run(`aapt dump badging ${filePath}`);

/**
 * @param {string} output
 * @returns {{label: string, version: string}}
 */
const aaptDumpBadgingParse = output => {
    const label = output?.match(/application-label:'(.+)'/)?.[1];
    const version = output?.match(/versionName='(.+?)'/)?.[1];
    return {label, version};
};

/**
 * @returns {Promise<Array<{label: string, version: string}>>}
 */
export const getApkFilesInfo = async () => {
    const paths = await globby(config.static.apk);

    const data = await Promise.all(
        paths
            .filter(elem => elem.endsWith('.apk'))
            .map(async path => {
                const output = await aaptDumpBadging(path);
                const relativePath = path.replace(config.static.root, '');
                const file = path.split('/').pop();

                return {
                    relativePath, file,
                    ...aaptDumpBadgingParse(output),
                };
            }),
    );

    return data.filter(({version}) => version);
};
