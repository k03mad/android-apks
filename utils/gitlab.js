import {req} from './request.js';

export const urls = {
    api: 'https://gitlab.com/api/v4',
    web: 'https://gitlab.com',
};

/**
 * @param {string} repo
 * @returns {Promise<object>}
 */
export const getReleases = repo => req(`${urls.api}/projects/${encodeURIComponent(repo)}/releases`);
