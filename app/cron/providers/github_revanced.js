import {getApkFromGhRepos} from './shared/github-release.js';

const repos = [
    {name: 'NoName-exe/revanced-extended', re: {include: /arm64|all/}},
    {name: 'inotia00/VancedMicroG'},
];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default () => getApkFromGhRepos(repos);
