import env from '../../../env.js';
import providers from '../providers/_index.js';
import {downloadApk} from '../utils/download.js';

await downloadApk(providers, env.scripts.skipClean);
