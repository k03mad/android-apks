import tasks from './tasks/_index.js';

for (const task of Object.values(tasks)) {
    await task();
}
