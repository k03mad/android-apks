import fs from 'node:fs/promises';

import {run} from './shell.js';

/**
 * @param {string} dir
 * @param {string} href
 */
export const cleanFolderDownloadApk = async (dir, href) => {
    await fs.mkdir(dir, {recursive: true});

    await run([
        `cd ${dir}`,
        'rm -rf *',
        `aria2c ${href}`,
    ].join(' && '));
};
