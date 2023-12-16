import env from '../../env.js';

const SERVER_FOLDER = 'app/server';
const DOWNLOAD_APK_FOLDER = 'download';

const DOMAIN_PATH = 'apps';

export default {
    url: {
        local: `http://localhost:${env.server.port}`,
        appsPath: DOMAIN_PATH,
    },
    static: {
        root: `${SERVER_FOLDER}/static`,
        download: {
            folder: DOWNLOAD_APK_FOLDER,
            apk: `${DOWNLOAD_APK_FOLDER}/${DOMAIN_PATH}`,
        },
    },
    handlebars: {
        views: `${SERVER_FOLDER}/views`,
        ext: '.hbs',
    },
};
