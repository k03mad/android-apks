import env from '../../env.js';
import tasks from './tasks/_index.js';

if (env.cron.name) {
    await tasks[env.cron.name]();
} else {
    for (const task of Object.values(tasks)) {
        await task();
    }
}
