import cron from './app/cron/cron.js';
import server from './app/server/server.js';
import {headerStyle} from './utils/colors.js';
import {log} from './utils/logs.js';
import {packageJson} from './utils/meta.js';

log(`app started: ${headerStyle(packageJson.name)}`);

cron();
server();
