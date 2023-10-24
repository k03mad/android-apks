import {Cron} from 'recron';

import {cronStyle, stringStyle} from '../../utils/colors.js';
import {log, logPlainError} from '../../utils/logging.js';
import tasks from './tasks/_index.js';

const DOWNLOAD_INTERVAL_HOURS = 5;

/** */
export default () => {
    const cron = new Cron();
    cron.start();

    Object.entries(tasks).forEach(([name, task], i) => {
        // 2 minutes interval between each app download start
        const cronString = `${i + i} */${DOWNLOAD_INTERVAL_HOURS} * * *`;
        log(`cron scheduled: ${cronStyle(cronString)} ${stringStyle(name)}`);

        cron.schedule(
            cronString,
            async () => {
                try {
                    await task();
                } catch (err) {
                    logPlainError(['cron', name, err]);
                }
            },
        );
    });
};
