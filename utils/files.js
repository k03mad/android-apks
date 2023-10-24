import fs from 'node:fs/promises';

/**
 * @param {string} dir
 */
export const cleanFolder = async dir => {
    await fs.rm(dir, {force: true, recursive: true});
    await fs.mkdir(dir, {recursive: true});
};
