import {getReleases} from '../../../utils/github.js';

const DEFAULT_RE = /apk$/;

const repos = [
    {repo: 'massivemadness/Squircle-CE', re: /.+google.+.apk/},
    {repo: 'organicmaps/organicmaps'},
    {repo: 'streetcomplete/StreetComplete'},
    {repo: 'yuliskov/SmartTube', re: /arm64/},
];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default async () => {
    const links = await Promise.all(repos.map(async ({re, repo}) => {
        const {body} = await getReleases(repo);

        const apkUrls = body?.[0]?.assets?.map(asset => asset?.browser_download_url);
        return apkUrls.filter(url => (re || DEFAULT_RE).test(url));
    }));

    return [...new Set(links.flat())].map(link => ({link}));
};
