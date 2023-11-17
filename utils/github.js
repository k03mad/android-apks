import env from '../env.js';
import {req} from './request.js';

const reqOpts = {
    headers: {
        'Authorization': env.github.token ? `Bearer ${env.github.token}` : '',
        'X-GitHub-Api-Version': '2022-11-28',
    },
};

export const urls = {
    api: 'https://api.github.com',
    web: 'https://github.com',
};

/**
 * @param {string} repo
 * @returns {Promise<object>}
 */
export const getReleases = repo => req(`${urls.api}/repos/${repo}/releases`, reqOpts);

/**
 * @param {string} org
 * @returns {Promise<object>}
 */
export const getOrgRepos = org => req(`${urls.api}/orgs/${org}/repos`, reqOpts);

/**
 * @param {string} user
 * @returns {Promise<object>}
 */
export const getUserRepos = user => req(`${urls.api}/users/${user}/repos`, reqOpts);
