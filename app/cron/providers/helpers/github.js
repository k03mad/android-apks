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
 * @param {Array<{name: string, skipPrerelease: boolean, re: {include: RegExp, exclude: RegExp}}>} repos
 * @param {object} opts
 * @param {boolean} opts.skipEmptyCheck
 */
export const getApkFromGhRepos = async (repos, {skipEmptyCheck} = {}) => {
    const links = await Promise.all(repos.flat().map(async ({name, skipPrerelease, re}) => {
        try {
            const {body} = await getReleases(name);

            const item = skipPrerelease ? body?.find(elem => !elem.prerelease) : body?.[0];

            let apkUrls = (item?.assets?.map(asset => asset?.browser_download_url) || [])
                .filter(elem => APPS_FILTER_DEFAULT_RE.test(elem));

            if (re?.include) {
                apkUrls = apkUrls.filter(elem => re.include.test(elem));
            }

            if (re?.exclude) {
                apkUrls = apkUrls.filter(elem => !re.exclude.test(elem));
            }

            const homepage = `${urls.web}/${name}`;

            if (!skipEmptyCheck && apkUrls.length === 0) {
                throw new Error(`[GITHUB] No apk link found\n${homepage}\n${re}`);
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

/**
 * @param {Array<{name: string, skipPrerelease: boolean, re: {include: RegExp, exclude: RegExp}}>} orgs
 * @returns {Promise<Array<{name: string, re: {include: RegExp, exclude: RegExp}}>>}
 */
export const getApkFromGhOrgs = async orgs => {
    const repos = await Promise.all(orgs.map(async opts => {
        try {
            const {body} = await getOrgRepos(opts.name);
            return body.map(elem => ({...opts, name: `${opts.name}/${elem.name}`}));
        } catch (err) {
            logError(err);
        }
    }));

    return getApkFromGhRepos(repos.filter(Boolean), {skipEmptyCheck: true});
};

/**
 * @param {Array<{name: string, skipPrerelease: boolean, re: {include: RegExp, exclude: RegExp}}>} orgs
 */
export const getApkFromGhUsers = async orgs => {
    const repos = await Promise.all(orgs.map(async opts => {
        try {
            const {body} = await getUserRepos(opts.name);
            return body.map(elem => ({...opts, name: `${opts.name}/${elem.name}`}));
        } catch (err) {
            logError(err);
        }
    }));

    return getApkFromGhRepos(repos.filter(Boolean), {skipEmptyCheck: true});
};
