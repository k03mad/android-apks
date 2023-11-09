import {getOrgRepos, getReleases, getUserRepos, urls} from '../../../../utils/github.js';

const APPS_FILTER_DEFAULT_RE = /apk$/;

/**
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} repos
 * @returns {Promise<Array<{link: string}>>}
 */
export const getApkFromGhRepos = async repos => {
    const links = await Promise.all(repos.flat().map(async ({name, re}) => {
        const {body} = await getReleases(name);

        const apkUrls = body?.[0]?.assets?.map(asset => asset?.browser_download_url) || [];
        let filteredLinks = apkUrls.filter(elem => APPS_FILTER_DEFAULT_RE.test(elem));

        if (filteredLinks.length > 1) {
            if (re?.include) {
                const reIncludeFiltered = filteredLinks.filter(elem => re.include.test(elem));

                if (reIncludeFiltered.length > 0) {
                    filteredLinks = reIncludeFiltered;
                }
            }

            if (re?.exclude) {
                const reExcludeFiltered = filteredLinks.filter(elem => !re.exclude.test(elem));

                if (reExcludeFiltered.length > 0) {
                    filteredLinks = reExcludeFiltered;
                }
            }
        }

        return filteredLinks.map(link => ({link, homepage: `${urls.web}/${name}`}));
    }));

    return links.flat().filter(elem => elem.link);
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

    return getApkFromGhRepos(repos);
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

    return getApkFromGhRepos(repos);
};
