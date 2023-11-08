import {getApkFromGhRepos} from './shared/github-release.js';

const repos = [
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced-extended', re: {include: /arm64|all/}},
];

/**
 * @returns {Promise<Array<{link: string, opts: object}>>}
 */
export default () => getApkFromGhRepos(repos);
