import env from '../../env.js';

const SERVER_FOLDER = 'app/server';

export default {
    url: {
        local: `http://localhost:${env.server.port}`,
    },
    static: {
        root: `${SERVER_FOLDER}/static`,
        apk: `${SERVER_FOLDER}/static/apps/apk`,
    },
    handlebars: {
        views: `${SERVER_FOLDER}/views`,
        ext: '.hbs',
    },
};
