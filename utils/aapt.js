import {globby} from 'globby';

import {APK, SERVER} from '../config.js';
import {run} from './shell.js';

/**
 * @param {string} output
 * @returns {{label: string, version: string}}
 */
const parseAaptOutput = output => {
    const label = output?.match(/application-label:'(.+)'/)?.[1];
    const version = output?.match(/versionName='(.+?)'/)?.[1];
    return {label, version};
};

/**
 * @returns {Promise<Array<{label: string, version: string}>>}
 */
export const getApkFilesInfo = async () => {
    const paths = await globby(APK.dir);

    const data = await Promise.all(
        paths
            .filter(elem => elem.endsWith('apk'))
            .map(async path => {
                const output = await run(`aapt dump badging ${path}`);
                const relativePath = path.replace(SERVER.static, '');
                const file = path.split('/').pop();

                return {
                    relativePath, file,
                    ...parseAaptOutput(output),
                };
            }),
    );

    return data.filter(({version}) => version);
};
