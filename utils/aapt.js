import {globby} from 'globby';

import config from '../app/server/config.js';
import {run} from './shell.js';

/**
 * @param {string} apkFilePath
 * @returns {Promise<string>}
 */
const aaptDumpBadging = apkFilePath => run(`aapt dump badging ${apkFilePath}`);

/**
 * @param {string} output
 */
const aaptDumpBadgingParse = output => {
    const label = output?.match(/application-label:'(.+)'/)?.[1];
    const version = output?.match(/versionName='(.+?)'/)?.[1];
    return {label, version};
};

/**
 * @param {string} folder
 * @returns {Promise<Array<{label: string, version: string, relativePath: string, file: string}>>}
 */
export const getApkFilesInfo = async folder => {
    const paths = await globby(folder);

    const data = await Promise.all(
        paths
            .filter(elem => elem.endsWith('.apk'))
            .sort()
            .map(async path => {
                let output;

                try {
                    output = await aaptDumpBadging(path);
                } catch (err) {
                    output = err.stdout;
                }

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
