import cp from 'node:child_process';
import util from 'node:util';

const exec = util.promisify(cp.exec);

/**
 * @param {string} runString
 * @returns {Promise<string>}
 */
export const run = async runString => {
    const {stdout} = await exec(runString);
    return stdout;
};
