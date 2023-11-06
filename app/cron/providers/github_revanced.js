import {getApkFromGhRepos} from './shared/github-release.js';

const repos = [
    {name: 'inotia00/revanced-manager'},
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced', re: {include: /arm64|all/}},
    {name: 'revanced/revanced-manager'},
];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default () => getApkFromGhRepos(repos);
