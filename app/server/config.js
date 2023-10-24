import env from '../../env.js';

const SERVER_FOLDER = 'app/server';
const SERVER_FOLDER_STATIC = `${SERVER_FOLDER}/static`;

export default {
    url: `http://localhost:${env.server.port}`,
    static: {
        root: SERVER_FOLDER_STATIC,
        apk: `${SERVER_FOLDER_STATIC}/apk`,
    },
    handlebars: {
        views: `${SERVER_FOLDER}/views`,
        ext: '.hbs',
    },
    rates: {
        windowMs: 1000,
        limit: 5,
        message: 429,
    },
};
