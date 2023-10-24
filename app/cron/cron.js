import {Cron} from 'recron';

import {cronStyle, stringStyle} from '../../utils/colors.js';
import {log, logPlainError} from '../../utils/logging.js';
import tasks from './tasks/_index.js';

const INTERVALS = {
    '2gis': '15 */6 * * *',
    'tinkoff': '25 */6 * * *',
    'kinopub': '35 */6 * * *',
};

/** */
export default () => {
    const cron = new Cron();
    cron.start();

    for (const [name, task] of Object.entries(tasks)) {
        const interval = INTERVALS[name];
        log(`cron scheduled: ${cronStyle(interval)} ${stringStyle(name)}`);

        cron.schedule(
            interval,
            async () => {
                try {
                    await task();
                } catch (err) {
                    logPlainError(['cron', name, err]);
                }
            },
        );
    }
};
