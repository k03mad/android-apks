import {Cron} from 'recron';

import {CRON} from '../../config.js';
import {logPlainError} from '../../utils/logging.js';
import tasks from './tasks/_index.js';

const scheduleOpts = {
    timezone: 'Europe/Moscow',
};

/** */
export default () => {
    const cron = new Cron();
    cron.start();

    for (const [name, fn] of Object.entries(tasks)) {
        cron.schedule(
            CRON.interval,
            async () => {
                try {
                    await fn();
                } catch (err) {
                    logPlainError(['cron', name, err]);
                }
            },
            scheduleOpts,
        );
    }
};
