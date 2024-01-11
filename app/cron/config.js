const OUTPUT_FOLDER = './output';

export default {
    interval: '0 */12 * * *',
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
