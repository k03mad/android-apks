import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'AdguardTeam/ContentBlocker'},
    {name: 'Aefyr/SAI'},
    {name: 'FossifyOrg/Gallery'},
    {name: 'imranr98/obtainium', re: {include: /arm64/}},
    {name: 'kyujin-cho/pixel-volte-patch'},
    {name: 'massivemadness/Squircle-CE', re: {include: /fdroid/}},
    {name: 'NoName-exe/revanced-extended-mnml', re: {include: /reddit/}},
    {name: 'organicmaps/organicmaps'},
    {name: 'RikkaApps/Shizuku'},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'termux/termux-app', re: {include: /arm64/}},
    {name: 'truefedex/tv-bro', re: {include: /arm64/}},
    {name: 'tytydraco/PDNSQS', re: {exclude: /unsigned/}},
]);
