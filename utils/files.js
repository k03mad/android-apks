import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * @param {string} file import.meta.url
 * @returns {string}
 */
export const getCurrentFilename = file => path.basename(file, '.js');

/**
 * @param {string} dir
 */
export const cleanFolder = async dir => {
    await fs.rm(dir, {force: true, recursive: true});
    await fs.mkdir(dir, {recursive: true});
};
