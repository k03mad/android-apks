import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'NoName-exe/revanced', filter: {include: /youtube-revanced/}},
    {name: 'polymorphicshade/Tubular'},
    {name: 'revanced-apks/build-apps', filter: {include: /youtube-revanced-extended/}},
    {name: 'ReVanced/GmsCore', filter: {exclude: /-hw-/}},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, filter: {include: /arm64/}},
]);
