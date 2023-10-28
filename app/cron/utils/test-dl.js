import env from '../../../env.js';
import * as providers from '../providers/_index.js';
import {downloadApk} from './download.js';

await downloadApk(providers, env.scripts.skipClean);
