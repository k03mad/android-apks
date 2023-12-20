import {logError} from '../../../../utils/logs.js';
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
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} repos
 */
export const getApkFromGlRepos = async repos => {
    const links = await Promise.all(repos.flat().map(async ({name, re}) => {
        try {
            const {body} = await getReleases(name);

            let apkUrls = body?.[0]?.description?.split('\n')
                .filter(elem => APPS_FILTER_DEFAULT_RE.test(elem))
                .map(elem => `${urls.web}/${name}${elem.match(APPS_FILTER_DEFAULT_RE)[1]}`);

            if (apkUrls.length > 1) {
                if (re?.include) {
                    apkUrls = apkUrls.filter(elem => re.include.test(elem));
                }

                if (re?.exclude) {
                    apkUrls = apkUrls.filter(elem => !re.exclude.test(elem));
                }
            }

            const homepage = `${urls.web}/${name}`;

            return apkUrls.map(link => ({
                link,
                homepage,
            }));
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem.link);
};
