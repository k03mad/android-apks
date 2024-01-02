import {getApkFromGhRepos} from './helpers/github.js';

const repos = [
    {name: 'polymorphicshade/NewPipe'},
    {name: 'TeamNewPipe/NewPipe'},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced-extended-mnml', re: {exclude: /reddit|youtube-music/}},
];

/** */
export default () => getApkFromGhRepos(repos);
