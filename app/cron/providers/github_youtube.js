import {getApkFromGhRepos} from './helpers/github.js';

const repos = [
    {name: 'inotia00/mMicroG', re: {include: /arm64/}},
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced-extended', re: {include: /all/}},
    {name: 'polymorphicshade/NewPipe'},
    {name: 'revanced/revanced-manager'},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
];

/** */
export default () => getApkFromGhRepos(repos);
