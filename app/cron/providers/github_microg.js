import {getApkFromGhRepos} from './helpers/github.js';

const repos = [
    {name: 'inotia00/mMicroG', re: {include: /arm64/}},
    {name: 'inotia00/VancedMicroG'},
    {name: 'microg/GmsCore', re: {include: /gms/, exclude: /-(lh|hw)/}},
];

/** */
export default () => getApkFromGhRepos(repos);
