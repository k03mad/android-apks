import {Cron} from 'recron';

import {cronStyle} from '../../utils/colors.js';
import {log} from '../../utils/logs.js';
import config from './config.js';
import providers from './providers/_index.js';
import {downloadApk, getData} from './utils/download.js';

/** */
export default () => {
    const cron = new Cron();
    cron.start();

    cron.schedule(
        config.interval,
        async () => {
            const providersData = await getData(providers);
            await downloadApk(providersData);
        },
    );

    log(`cron scheduled: ${cronStyle(config.interval)} [${Object.keys(providers).join(', ')}]`);
};
