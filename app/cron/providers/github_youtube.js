import {getApkFromGhRepos} from './helpers/github.js';

const repos = [
    {name: 'polymorphicshade/NewPipe'},
    {name: 'TeamNewPipe/NewPipe'},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
];

/** */
export default () => getApkFromGhRepos(repos);
