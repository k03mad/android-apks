import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'inotia00/VancedMicroG'},
    {name: 'NoName-exe/revanced-extended-mnml', filter: {exclude: /reddit|youtube-music/}},
    {name: 'polymorphicshade/Tubular'},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, filter: {include: /arm64/}},
]);
