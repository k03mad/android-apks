export default {
    interval: '45 5,17 * * *',
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
