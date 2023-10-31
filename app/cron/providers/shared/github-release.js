import {getOrgRepos, getReleases} from '../../../../utils/github.js';

const APPS_FILTER_DEFAULT_RE = /apk$/;

const APPS_FILTER_FEW_INCLUDE_RE = /(foss|fdroid|arm64)/;
const APPS_FILTER_FEW_EXCLUDE_RE = /conscrypt/;

/**
 * @param {Array<string>} repos
 * @returns {Promise<Array<{link: string}>>}
 */
export const getApkFromGhRepo = async repos => {
    const uniqRepos = [...new Set(repos)];

    const links = await Promise.all(uniqRepos.map(async repo => {
        const {body} = await getReleases(repo);

        const apkUrls = body?.[0]?.assets?.map(asset => asset?.browser_download_url) || [];
        const filtered = apkUrls.filter(elem => APPS_FILTER_DEFAULT_RE.test(elem));

        if (filtered?.length > 1) {
            const extraFiltered = filtered.filter(elem => APPS_FILTER_FEW_INCLUDE_RE.test(elem));

            if (extraFiltered.length > 0) {
                return extraFiltered;
            }
        }

        if (filtered?.length > 1) {
            const extraFiltered = filtered.filter(elem => !APPS_FILTER_FEW_EXCLUDE_RE.test(elem));

            if (extraFiltered.length > 0) {
                return extraFiltered;
            }
        }

        return filtered;
    }));

    return [...new Set(links.flat().filter(Boolean))].map(link => ({link}));
};

/**
 * @param {string} org
 * @returns {Promise<Array<{link: string}>>}
 */
export const getApkFromGhOrg = async org => {
    const {body} = await getOrgRepos(org);
    const repos = body.map(elem => `${org}/${elem.name}`);

    return getApkFromGhRepo(repos);
};
