import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced-extended-mnml', re: {exclude: /reddit|youtube-music/}},
    {name: 'polymorphicshade/NewPipe'},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, re: {include: /arm64/}},
]);
