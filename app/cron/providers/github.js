import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'AdguardTeam/ContentBlocker'},
    {name: 'Aefyr/SAI'},
    {name: 'FossifyOrg/Gallery'},
    {name: 'imranr98/obtainium', filter: {include: /arm64/, exclude: /fdroid/}},
    {name: 'inotia00/VancedMicroG'},
    {name: 'kyujin-cho/pixel-volte-patch'},
    {name: 'lampa-app/LAMPA'},
    {name: 'massivemadness/Squircle-CE', filter: {include: /fdroid/}},
    {name: 'organicmaps/organicmaps'},
    {name: 'revanced-apks/build-apps', filter: {file: true, include: /youtube-rex/}},
    {name: 'RikkaApps/Shizuku'},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'termux/termux-app', filter: {include: /arm64/}},
    {name: 'truefedex/tv-bro', filter: {include: /arm64/}},
    {name: 'tytydraco/PDNSQS', filter: {exclude: /unsigned/}},
    {name: 'YouROK/TorrServe'},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, filter: {include: /arm64/}},
    {name: 'samolego/Canta', filter: {include: /arm64/}},
]);
