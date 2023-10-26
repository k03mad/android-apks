import providers from '../providers/_index.js';
import {downloadApk, getData} from '../utils/download.js';

const providersData = await getData(providers);
await downloadApk(providersData);
