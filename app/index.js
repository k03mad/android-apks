import {log} from '@k03mad/simple-log';

import {headerStyle} from '../utils/colors.js';
import {packageJson} from '../utils/meta.js';

import cron from './cron/cron.js';
import server from './server/server.js';

log(`app started: ${headerStyle(packageJson.name)}`);

cron();
server();
