import {Cron} from 'recron';

import {cronStyle} from '../../utils/colors.js';
import {log} from '../../utils/logs.js';
import config from './config.js';
import * as providers from './providers/_index.js';
import task from './task/task.js';

/** */
export default () => {
    const cron = new Cron();

    cron.start();
    cron.schedule(config.interval, () => task(providers));

    log(`cron scheduled: ${cronStyle(config.interval)} [${Object.keys(providers).join(', ')}]`);
};
