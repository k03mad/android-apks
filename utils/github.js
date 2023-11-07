import {request} from '@k03mad/request';

import env from '../env.js';

const reqOpts = {
    headers: {
        'Authorization': env.github.token ? `Bearer ${env.github.token}` : '',
        'X-GitHub-Api-Version': '2022-11-28',
    },
};

/**
 * @param {string} repo
 * @returns {Promise<object>}
 */
export const getReleases = repo => request(`https://api.github.com/repos/${repo}/releases`, reqOpts);

/**
 * @param {string} org
 * @returns {Promise<object>}
 */
export const getOrgRepos = org => request(`https://api.github.com/orgs/${org}/repos`, reqOpts);

/**
 * @param {string} user
 * @returns {Promise<object>}
 */
export const getUserRepos = user => request(`https://api.github.com/users/${user}/repos`, reqOpts);
