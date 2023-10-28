import {log} from '../../../utils/logs.js';
import providers from '../providers/_index.js';
import {getData} from '../utils/download.js';

const providersData = await getData(providers);
log(providersData);
