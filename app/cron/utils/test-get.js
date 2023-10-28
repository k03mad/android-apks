import {log} from '../../../utils/logs.js';
import * as providers from '../providers/_index.js';
import {getData} from './download.js';

const providersData = await getData(providers);
log(providersData);
