import {createRequire} from 'node:module';
import path from 'node:path';

import config from '../app/server/config.js';

const require = createRequire(import.meta.url);

export const packageJson = require('../package');

/** @param {string} dir */
export const getApkDir = dir => `${config.static.apk}/${path.basename(dir, '.js')}`;
