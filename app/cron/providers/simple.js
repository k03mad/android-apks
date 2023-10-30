import {getOrgRepos, getReleases} from '../../../utils/github.js';

const REPO_ORG = 'SimpleMobileTools';

const FEW_APPS_FILTER_RE = /foss|fdroid/;

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default async () => {
    const {body: bodyRepos} = await getOrgRepos(REPO_ORG);
    const repos = bodyRepos.map(elem => elem.name);

    const links = await Promise.all(repos.map(async repo => {
        const {body} = await getReleases(`${REPO_ORG}/${repo}`);

        const apkUrls = body?.[0]?.assets?.map(asset => asset?.browser_download_url);

        if (apkUrls?.length > 1) {
            return apkUrls.filter(elem => FEW_APPS_FILTER_RE.test(elem));
        }

        return apkUrls;
    }));

    return [...new Set(links.flat().filter(Boolean))].map(link => ({link}));
};
