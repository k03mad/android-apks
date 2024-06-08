const OUTPUT_FOLDER = './output';

export default {
    interval: '30 */5 * * *',
    apk: {
        minSizeB: 51_200,
    },
    download: {
        concurrency: 3,
    },
    output: {
        folder: OUTPUT_FOLDER,
        data: `${OUTPUT_FOLDER}/data.json`,
        errors: `${OUTPUT_FOLDER}/errors.log`,
    },
};
