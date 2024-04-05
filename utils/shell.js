import cp from 'node:child_process';
import {promisify} from 'node:util';

const exec = promisify(cp.exec);

/**
 * @param {string} runString
 * @returns {Promise<{stdout: string, stderr: string}>}
 */
export const run = runString => exec(runString, {shell: '/bin/bash'});
