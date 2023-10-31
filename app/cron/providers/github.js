import {getApkFromGhRepos} from './shared/github-release.js';

const repos = [
    {name: 'bravenewpipe/NewPipe', re: {exclude: /conscrypt/}},
    {name: 'deckerst/aves', re: {include: /libre-arm64/}},
    {name: 'libre-tube/LibreTube', re: {include: /arm64/}},
    {name: 'M66B/NetGuard'},
    {name: 'massivemadness/Squircle-CE', re: {include: /fdroid/}},
    {name: 'organicmaps/organicmaps'},
    {name: 'polymorphicshade/NewPipe'},
    {name: 'ReVanced/revanced-manager'},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'TeamNewPipe/NewPipe'},
    {name: 'termux/termux-app', re: {include: /arm64/}},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default () => getApkFromGhRepos(repos);
