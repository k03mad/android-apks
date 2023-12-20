import env from '../../../../env.js';
import {logError} from '../../../../utils/logs.js';
import {req} from '../../../../utils/request.js';

const APPS_FILTER_DEFAULT_RE = /apk$/;

const urls = {
    api: 'https://api.github.com',
    web: 'https://github.com',
};

const reqOpts = {
    headers: {
        'Authorization': env.github.token ? `Bearer ${env.github.token}` : '',
        'X-GitHub-Api-Version': '2022-11-28',
    },
    searchParams: {
        sort: 'updated',
        direction: 'desc',
        per_page: 100,
    },
};

/**
 * @param {string} repo
 * @returns {Promise<object>}
 */
const getReleases = repo => req(`${urls.api}/repos/${repo}/releases`, reqOpts);

/**
 * @param {string} org
 * @returns {Promise<object>}
 */
const getOrgRepos = org => req(`${urls.api}/orgs/${org}/repos`, reqOpts);

/**
 * @param {string} user
 * @returns {Promise<object>}
 */
const getUserRepos = user => req(`${urls.api}/users/${user}/repos`, reqOpts);

/**
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} repos
 */
export const getApkFromGhRepos = async repos => {
    const links = await Promise.all(repos.flat().map(async ({name, re}) => {
        try {
            const {body} = await getReleases(name);

            const apkUrls = body?.[0]?.assets?.map(asset => asset?.browser_download_url) || [];
            let filteredLinks = apkUrls.filter(elem => APPS_FILTER_DEFAULT_RE.test(elem));

            if (filteredLinks.length > 1) {
                if (re?.include) {
                    filteredLinks = filteredLinks.filter(elem => re.include.test(elem));
                }

                if (re?.exclude) {
                    filteredLinks = filteredLinks.filter(elem => !re.exclude.test(elem));
                }
            }

            const homepage = `${urls.web}/${name}`;

            return filteredLinks.map(link => ({
                link,
                homepage,
            }));
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};

/**
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} orgs
 * @returns {Promise<Array<{name: string, re: {include: RegExp, exclude: RegExp}}>>}
 */
export const getApkFromGhOrgs = async orgs => {
    const repos = await Promise.all(orgs.map(async ({name, re}) => {
        try {
            const {body} = await getOrgRepos(name);
            return body.map(elem => ({name: `${name}/${elem.name}`, re}));
        } catch (err) {
            logError(err);
        }
    }));

    return getApkFromGhRepos(repos);
};

/**
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} orgs
 */
export const getApkFromGhUsers = async orgs => {
    const repos = await Promise.all(orgs.map(async ({name, re}) => {
        try {
            const {body} = await getUserRepos(name);
            return body.map(elem => ({name: `${name}/${elem.name}`, re}));
        } catch (err) {
            logError(err);
        }
    }));

    return getApkFromGhRepos(repos);
};
