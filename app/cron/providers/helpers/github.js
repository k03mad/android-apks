import {logError} from '@k03mad/simple-log';

import env from '../../../../env.js';
import {req} from '../../../../utils/request.js';

const APPS_FILTER_DEFAULT = 'apk';

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
 * @typedef {object} request
 * @property {string} [name]
 * @property {string} [archive]
 * @property {boolean} [skipPrerelease]
 * @property {{file: boolean, include: RegExp, exclude: RegExp}} [filter]
 */

/**
 * @param {Array<request>} repos
 * @param {object} [opts]
 * @param {boolean} [opts.skipEmptyCheck]
 */
export const getApkFromGhRepos = async (repos, {skipEmptyCheck} = {}) => {
    const links = await Promise.all(repos.flat().map(async ({name, archive, skipPrerelease, filter}) => {
        try {
            const {body} = await getReleases(name);

            const item = skipPrerelease ? body?.find(elem => !elem.prerelease) : body?.[0];

            let apkLinks = (item?.assets?.map(asset => asset?.browser_download_url) || [])
                .filter(elem => elem.endsWith(archive) || elem.endsWith(APPS_FILTER_DEFAULT));

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

            if (!skipEmptyCheck && apkLinks.length === 0) {
                throw new Error(`[GITHUB] No apk link found\n${homepage}\n${filter}`);
            }

            return apkLinks.map(link => ({
                link,
                homepage,
                archive,
            }));
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};

/**
 * @param {Array<request>} orgs
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
 * @param {Array<request>} users
 */
export const getApkFromGhUsers = async users => {
    const repos = await Promise.all(users.map(async opts => {
        try {
            const {body} = await getUserRepos(opts.name);
            return body.map(elem => ({...opts, name: `${opts.name}/${elem.name}`}));
        } catch (err) {
            logError(err);
        }
    }));

    return getApkFromGhRepos(repos.filter(Boolean), {skipEmptyCheck: true});
};
