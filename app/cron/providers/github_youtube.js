import {getApkFromGhRepos} from './helpers/github.js';

const repos = [
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced-extended-mnml', re: {exclude: /reddit|youtube-music/}},
    {name: 'polymorphicshade/NewPipe'},
    {name: 'TeamNewPipe/NewPipe'},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, re: {include: /arm64/}},
];

/** */
export default () => getApkFromGhRepos(repos);
