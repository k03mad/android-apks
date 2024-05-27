import cp from 'node:child_process';
import {promisify} from 'node:util';

import _debug from 'debug';

const debug = _debug('mad:shell');
const exec = promisify(cp.exec);

/**
 * @param {string} runString
 * @returns {Promise<{stdout: string, stderr: string}>}
 */
export const run = runString => {
    debug('%o', runString);
    return exec(runString, {shell: '/bin/bash'});
};
