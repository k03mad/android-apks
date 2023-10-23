import {Cron} from 'recron';

import {logPlainError} from '../../utils/logging.js';
import config from './config.js';
import tasks from './tasks/_index.js';

/** */
export default () => {
    const cron = new Cron();
    cron.start();

    Object.entries(tasks).forEach(([name, fn], i) => {
        cron.schedule(
            config.interval(i),
            async () => {
                try {
                    await fn();
                } catch (err) {
                    logPlainError(['cron', name, err]);
                }
            },
            config.scheduleOpts,
        );
    });
};
