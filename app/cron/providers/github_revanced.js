import {getApkFromGhRepos} from './shared/github.js';

const repos = [
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced-extended', re: {include: /arm64|all/}},
];

/** */
export default () => getApkFromGhRepos(repos);
