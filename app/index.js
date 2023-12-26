import {headerStyle} from '../utils/colors.js';
import {log} from '../utils/logs.js';
import {packageJson} from '../utils/meta.js';

import server from './server/server.js';
import cron from './cron/cron.js';

log(`app started: ${headerStyle(packageJson.name)}`);

cron();
server();
