import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'AdguardTeam/ContentBlocker'},
    {name: 'Aefyr/SAI'},
    {name: 'Catfriend1/syncthing-android', filter: {exclude: /fdroid|gplay/}},
    {name: 'DP-Hridayan/aShellYou'},
    {name: 'imranr98/obtainium', filter: {include: /arm64/, exclude: /fdroid/}},
    {name: 'kyujin-cho/pixel-volte-patch'},
    {name: 'lampa-app/LAMPA'},
    {name: 'massivemadness/Squircle-CE', filter: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps', filter: {include: /web/}},
    {name: 'proninyaroslav/libretorrent', filter: {include: /arm64/}},
    {name: 'RikkaApps/Shizuku'},
    {name: 'Sheinices/Prisma_TV'},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'termux/termux-app', skipPrerelease: true, filter: {include: /arm64/}},
    {name: 'topjohnwu/Magisk'},
    {name: 'truefedex/tv-bro', filter: {include: /arm64/}},
    {name: 'tytydraco/PDNSQS', filter: {exclude: /unsigned/}},
    {name: 'YouROK/TorrServe'},
]);
