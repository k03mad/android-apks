const LOGS_FOLDER = './logs';

export default {
    interval: '0 */5 * * *',
    download: {
        concurrency: 2,
    },
    logs: {
        folder: LOGS_FOLDER,
        timestamp: {
            file: `${LOGS_FOLDER}/timestamp.log`,
            format: {
                full: 'YYYY-MM-DD HH:mm:ss',
                time: 'HH:mm:ss',
            },
        },
    },
};
