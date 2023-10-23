const MINUTES_BETWEEN_TASKS = 5;

export default {
    interval: (i = 0) => `${i * MINUTES_BETWEEN_TASKS} */1 * * *`,
    scheduleOpts: {
        timezone: 'Europe/Moscow',
    },
};
