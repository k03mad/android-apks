import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced-extended-mnml', re: {exclude: /reddit|youtube-music/}},
    {name: 'polymorphicshade/Tubular'},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, re: {include: /arm64/}},
]);
