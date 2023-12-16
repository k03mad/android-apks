import env from '../../env.js';

const SERVER_FOLDER = 'app/server';
const DOWNLOAD_APK_FOLDER = 'download';

export default {
    url: `http://localhost:${env.server.port}`,
    static: {
        root: `${SERVER_FOLDER}/static`,
        download: {
            folder: DOWNLOAD_APK_FOLDER,
            apk: `${DOWNLOAD_APK_FOLDER}/apk`,
        },
    },
    handlebars: {
        views: `${SERVER_FOLDER}/views`,
        ext: '.hbs',
    },
};
