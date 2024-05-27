import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'AdguardTeam/ContentBlocker'},
    {name: 'Aefyr/SAI'},
    {name: 'Catfriend1/syncthing-android', filter: {exclude: /fdroid|gplay/}},
    {name: 'FossifyOrg/Gallery'},
    {name: 'imranr98/obtainium', filter: {include: /arm64/, exclude: /fdroid/}},
    {name: 'kyujin-cho/pixel-volte-patch'},
    {name: 'lampa-app/LAMPA'},
    {name: 'massivemadness/Squircle-CE', filter: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps', filter: {include: /web/}},
    {name: 'polymorphicshade/Tubular'},
    {name: 'Rakashazi/emu-ex-plus-alpha', archive: 'zip', filter: {include: /GbaEmu|MdEmu|NesEmu|Snes9xEXPlus/}},
    {name: 'RikkaApps/Shizuku'},
    {name: 'Sheinices/Prisma_TV'},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'termux/termux-app', filter: {include: /arm64/}},
    {name: 'truefedex/tv-bro', filter: {include: /arm64/}},
    {name: 'tytydraco/PDNSQS', filter: {exclude: /unsigned/}},
    {name: 'YouROK/TorrServe'},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, filter: {include: /arm64/}},
]);
