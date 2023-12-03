export default {
    interval: '0 3 * * *',
    apk: {
        minSizeB: 51_200,
    },
    download: {
        concurrency: 2,
    },
    json: {
        file: './app/data.json',
    },
};
