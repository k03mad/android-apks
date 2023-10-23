import tasks from './tasks/_index.js';

await Promise.all(Object.values(tasks).map(task => task()));
