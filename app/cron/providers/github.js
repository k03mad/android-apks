import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'Aefyr/SAI'},
    {name: 'imranr98/obtainium', re: {include: /arm64/}},
    {name: 'kyujin-cho/pixel-volte-patch'},
    {name: 'massivemadness/Squircle-CE', re: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps'},
    {name: 'RikkaApps/Shizuku'},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'tytydraco/PDNSQS', re: {exclude: /unsigned/}},
    {name: 'NoName-exe/revanced-extended-mnml', re: {include: /reddit/}},
    {name: 'termux/termux-app', re: {include: /arm64/}},
    {name: 'FossifyOrg/Gallery'},
]);
