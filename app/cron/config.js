const OUTPUT_FOLDER = './output';

export default {
    interval: '45 5,17 * * *',
    apk: {
        minSizeB: 51_200,
    },
    download: {
        concurrency: 2,
    },
    output: {
        folder: OUTPUT_FOLDER,
        data: `${OUTPUT_FOLDER}/data.json`,
        errors: `${OUTPUT_FOLDER}/errors.log`,
    },
};
