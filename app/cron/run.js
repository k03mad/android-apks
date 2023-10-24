import pMap from 'p-map';

import env from '../../env.js';
import {stringStyle} from '../../utils/colors.js';
import {log} from '../../utils/logging.js';
import tasks from './tasks/_index.js';

const cronNameArg = env.cron.name;
const concurrency = 2;

if (cronNameArg) {
    log(`starting: ${stringStyle(cronNameArg)}`);
    await tasks[cronNameArg]();
} else {
    await pMap(Object.entries(tasks), async ([name, task]) => {
        log(`starting: ${stringStyle(name)}`);
        await task();
    }, {concurrency});
}
