import {Cron} from 'recron';

import {logPlainError} from '../../utils/logging.js';
import tasks from './tasks/_index.js';

/** */
export default () => {
    const cron = new Cron();
    cron.start();

    for (const [name, elem] of Object.entries(tasks)) {
        cron.schedule(
            elem.interval,
            async () => {
                try {
                    await elem.task();
                } catch (err) {
                    logPlainError(['cron', name, err]);
                }
            },
        );
    }
};
