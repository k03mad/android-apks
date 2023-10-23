import cron from './app/cron/cron.js';
import server from './app/server/server.js';
import {headerStyle} from './utils/colors.js';
import {packageJson} from './utils/json.js';
import {log} from './utils/logging.js';

log(`app started: ${headerStyle(packageJson.name)}`);

cron();
server();
