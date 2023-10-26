import {Cron} from 'recron';

import {cronStyle} from '../../utils/colors.js';
import {log} from '../../utils/logs.js';
import config from './config.js';
import providers from './providers/_index.js';
import {downloadApk} from './utils/download.js';

/** */
export default () => {
    const cron = new Cron();

    cron.start();
    cron.schedule(config.interval, () => downloadApk(providers));

    log(`cron scheduled: ${cronStyle(config.interval)} [${Object.keys(providers).join(', ')}]`);
};
