import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'AdguardTeam/ContentBlocker'},
    {name: 'Aefyr/SAI'},
    {name: 'Catfriend1/syncthing-android', filter: {exclude: /fdroid|gplay/}},
    {name: 'imranr98/obtainium', filter: {include: /arm64/, exclude: /fdroid/}},
    {name: 'lampa-app/LAMPA'},
    {name: 'massivemadness/Squircle-CE', filter: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'proninyaroslav/libretorrent', filter: {include: /arm64/}},
    {name: 'Sheinices/Prisma_TV'},
    {name: 'termux/termux-app', skipPrerelease: true, filter: {include: /arm64/}},
    {name: 'truefedex/tv-bro', filter: {include: /arm64/}},
    {name: 'YouROK/TorrServe'},
    {name: 'theothernt/AerialViews'},
]);
