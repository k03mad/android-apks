import {logError} from '@k03mad/simple-log';

import {req} from '../../../../utils/request.js';

const APPS_FILTER_DEFAULT_RE = /\((.+\.apk)\)/;

const urls = {
    api: 'https://gitlab.com/api/v4',
    web: 'https://gitlab.com',
};

/**
 * @param {string} repo
 * @returns {Promise<object>}
 */
const getReleases = repo => req(`${urls.api}/projects/${encodeURIComponent(repo)}/releases`);

/**
 * @param {Array<{name: string, filter: {include: RegExp, exclude: RegExp}}>} repos
 */
export const getApkFromGlRepos = async repos => {
    const links = await Promise.all(repos.flat().map(async ({name, filter}) => {
        try {
            const {body} = await getReleases(name);

            let apkUrls = body?.[0]?.description?.split('\n')
                .filter(elem => APPS_FILTER_DEFAULT_RE.test(elem))
                .map(elem => `${urls.web}/${name}${elem.match(APPS_FILTER_DEFAULT_RE)[1]}`);

            if (filter?.include) {
                apkUrls = apkUrls.filter(elem => filter.include.test(elem));
            }

            if (filter?.exclude) {
                apkUrls = apkUrls.filter(elem => !filter.exclude.test(elem));
            }

            const homepage = `${urls.web}/${name}`;

            if (apkUrls.length === 0) {
                throw new Error(`[GITLAB] No apk link found\n${homepage}\n${filter}`);
            }

            return apkUrls.map(link => ({
                link,
                homepage,
            }));
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};
