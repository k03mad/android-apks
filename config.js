import env from './env.js';

const WWW_FOLDER = 'app/server';

export const SERVER = {
    url: `http://localhost:${env.server.port}`,
    static: `${WWW_FOLDER}/static`,
    rates: {
        windowMs: 1000,
        limit: 3,
        message: 429,
    },
};

export const PAGE = {
    header: 'ANDROID APKS',
    timestamps: 10,
    ua: 100,
};

export const CRON = {
    interval: '0 */1 * * *',
};

export const APK = {
    dir: `${SERVER.static}/apk`,
};

export const HANDLEBARS = {
    views: `${WWW_FOLDER}/views`,
    ext: '.hbs',
};
