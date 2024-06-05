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
 * @param {Array<{
 * name: string,
 * opts: {ua: string, proxy: boolean, semVerRemovePatch: boolean}
 * filter: {file: boolean, include: RegExp, exclude: RegExp}
 * }>} repos
 */
export const getApkFromGlRepos = async repos => {
    const links = await Promise.all(repos.flat().map(async ({name, filter, opts}) => {
        try {
            const {body} = await getReleases(name);

            let apkLinks = body?.[0]?.description?.split('\n')
                .filter(elem => APPS_FILTER_DEFAULT_RE.test(elem))
                .map(elem => `${urls.web}/${name}${elem.match(APPS_FILTER_DEFAULT_RE)[1]}`);

            if (filter?.include) {
                apkLinks = apkLinks.filter(elem => filter.file
                    ? filter.include.test(elem.split('/').at(-1))
                    : filter.include.test(elem),
                );
            }

            if (filter?.exclude) {
                apkLinks = apkLinks.filter(elem => filter.file
                    ? !filter.exclude.test(elem.split('/').at(-1))
                    : !filter.exclude.test(elem),
                );
            }

            const homepage = `${urls.web}/${name}`;

            if (apkLinks.length === 0) {
                throw new Error(`[GITLAB] No apk link found\n${homepage}\n${filter}`);
            }

            return apkLinks.map(link => ({
                link,
                homepage,
                opts,
            }));
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};
