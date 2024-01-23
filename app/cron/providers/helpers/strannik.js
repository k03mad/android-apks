import {getApkFromParse} from './parse.js';

/**
 * @param {Array<{name: string}>} apps
 */
export const getApkFromStrannik = apps => getApkFromParse(
    apps.map(app => ({
        page: `https://strannikmodz.me/apps/media/${app.name}.html`,
        re: /href="(.+do=download&id=\d+)"/,
        errorName: 'strannik',
    })),
);
