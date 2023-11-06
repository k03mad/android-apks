import {getOrgRepos, getReleases, getUserRepos} from '../../../../utils/github.js';

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
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} orgs
 * @returns {Promise<Array<{name: string, re: {include: RegExp, exclude: RegExp}}>>}
 */
export const getApkFromGhOrgs = async orgs => {
    const repos = await Promise.all(orgs.map(async ({name, re}) => {
        const {body} = await getOrgRepos(name);
        return body.map(elem => ({name: `${name}/${elem.name}`, re}));
    }));

    return getApkFromGhRepos(repos.flat());
};

/**
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} orgs
 * @returns {Promise<Array<{name: string, re: {include: RegExp, exclude: RegExp}}>>}
 */
export const getApkFromGhUsers = async orgs => {
    const repos = await Promise.all(orgs.map(async ({name, re}) => {
        const {body} = await getUserRepos(name);
        return body.map(elem => ({name: `${name}/${elem.name}`, re}));
    }));

    return getApkFromGhRepos(repos.flat());
};
