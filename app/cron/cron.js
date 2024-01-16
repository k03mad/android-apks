import {log} from '@k03mad/simple-log';
import {Cron} from 'recron';

import {cronStyle} from '../../utils/colors.js';

import config from './config.js';
import * as _providers from './providers/_index.js';
import {removeStartUnderline} from './task/helpers/providers.js';
import task from './task/task.js';

const providers = removeStartUnderline(_providers);

/** */
export default () => {
    const cron = new Cron();

    cron.start();
    cron.schedule(config.interval, () => task(providers));

    log(`cron scheduled: ${cronStyle(config.interval)} [${Object.keys(providers).join(', ')}]`);
};
