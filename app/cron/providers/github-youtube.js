import {getApkFromGhRepos} from './helpers/github.js';

const repos = [
    {name: 'libre-tube/LibreTube', re: {include: /arm64/}},
    {name: 'polymorphicshade/NewPipe'},
    {name: 'TeamNewPipe/NewPipe'},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
];

/** */
export default () => getApkFromGhRepos(repos);
