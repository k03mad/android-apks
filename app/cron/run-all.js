import tasks from './tasks/_index.js';

await Promise.all(Object.entries(tasks).map(([, elem]) => elem.task()));
