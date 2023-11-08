import {getApkFromGhOrgs, getApkFromGhRepos} from './shared/github-release.js';

const repos = [
    {name: 'AdAway/AdAway'},
    {name: 'bravenewpipe/NewPipe', re: {exclude: /conscrypt/}},
    {name: 'celzero/rethink-app'},
    {name: 'Chooloo/koler'},
    {name: 'deckerst/aves', re: {include: /libre-arm64/}},
    {name: 'libre-tube/LibreTube', re: {include: /arm64/}},
    {name: 'M66B/NetGuard'},
    {name: 'markusfisch/BinaryEye'},
    {name: 'massivemadness/Squircle-CE', re: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps'},
    {name: 'polymorphicshade/NewPipe'},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'TeamNewPipe/NewPipe'},
    {name: 'termux/termux-app', re: {include: /arm64/}},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
];

const orgs = [{name: 'darkmoonight', re: {include: /arm64.+(release|floss)/}}];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default async () => {
    const data = await Promise.all([
        getApkFromGhRepos(repos),
        getApkFromGhOrgs(orgs),
    ]);

    return data.flat();
};
