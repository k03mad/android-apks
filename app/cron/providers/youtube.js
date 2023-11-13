import {getApkFromGhRepos} from './helpers/github.js';

const repos = [
    {name: 'inotia00/VancedMicroG'},
    {name: 'libre-tube/LibreTube', re: {include: /arm64/}},
    {name: 'NoName-exe/revanced-extended', re: {include: /arm64|all/}},
    {name: 'polymorphicshade/NewPipe'},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
];

/** */
export default () => getApkFromGhRepos(repos);
