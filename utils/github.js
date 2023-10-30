import {request} from '@k03mad/request';

import env from '../env.js';

const reqOpts = {
    headers: {
        authorization: env.github.token ? `Bearer ${env.github.token}` : '',
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
