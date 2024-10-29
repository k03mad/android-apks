import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'AdguardTeam/ContentBlocker'},
    {name: 'Aefyr/SAI'},
    {name: 'Catfriend1/syncthing-android', filter: {include: /fdroid|gplay|signed/}},
    {name: 'DP-Hridayan/aShellYou'},
    {name: 'imranr98/obtainium', filter: {include: /arm64/, exclude: /fdroid/}},
    {name: 'kyujin-cho/pixel-volte-patch'},
    {name: 'lampa-app/LAMPA'},
    {name: 'massivemadness/Squircle-CE', filter: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps', filter: {include: /web/}},
    {name: 'proninyaroslav/libretorrent', filter: {include: /arm64/}},
    {name: 'reqable/reqable-app', filter: {include: /arm64/}},
    {name: 'revanced-apks/build-apps', filter: {include: /youtube-revanced-extended/}},
    {name: 'ReVanced/GmsCore', filter: {exclude: /-hw-/}},
    {name: 'RikkaApps/Shizuku'},
    {name: 'Sheinices/Prisma_TV'},
    {name: 'streetcomplete/StreetComplete', skipPrerelease: true},
    {name: 'termux/termux-app', skipPrerelease: true, filter: {include: /arm64/}},
    {name: 'theothernt/AerialViews'},
    {name: 'topjohnwu/Magisk', skipPrerelease: true},
    {name: 'truefedex/tv-bro', filter: {include: /arm64/}},
    {name: 'tytydraco/PDNSQS', filter: {exclude: /unsigned/}},
    {name: 'YouROK/TorrServe'},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, filter: {include: /arm64/}},
]);
