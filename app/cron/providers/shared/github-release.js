import {getOrgRepos, getReleases} from '../../../../utils/github.js';

const APPS_FILTER_DEFAULT_RE = /apk$/;

/**
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} repos
 * @returns {Promise<Array<{link: string}>>}
 */
export const getApkFromGhRepos = async repos => {
    const links = await Promise.all(repos.map(async ({name, re}) => {
        const {body} = await getReleases(name);

        const apkUrls = body?.[0]?.assets?.map(asset => asset?.browser_download_url) || [];
        let filtered = apkUrls.filter(elem => APPS_FILTER_DEFAULT_RE.test(elem));

        if (filtered.length > 1) {
            if (re?.include) {
                const reIncludeFiltered = filtered.filter(elem => re.include.test(elem));

                if (reIncludeFiltered.length > 0) {
                    filtered = reIncludeFiltered;
                }
            }

            if (re?.exclude) {
                const reExcludeFiltered = filtered.filter(elem => !re.exclude.test(elem));

                if (reExcludeFiltered.length > 0) {
                    filtered = reExcludeFiltered;
                }
            }
        }

        return filtered;
    }));

    return [...new Set(links.flat().filter(Boolean))].map(link => ({link}));
};

/**
 * @param {{name: string, re: {include: RegExp, exclude: RegExp}}} org
 * @returns {Promise<Array<{name: string, re: {include: RegExp, exclude: RegExp}}>>}
 */
export const getApkFromGhOrg = async org => {
    const {body} = await getOrgRepos(org.name);
    const repos = body.map(elem => ({name: `${org.name}/${elem.name}`, re: org.re}));

    return getApkFromGhRepos(repos);
};
