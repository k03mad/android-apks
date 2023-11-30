import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'Chooloo/koler'},
    {name: 'EtchDroid/EtchDroid'},
    {name: 'imranr98/obtainium', re: {include: /arm64/}},
    {name: 'kyujin-cho/pixel-volte-patch'},
    {name: 'M66B/NetGuard'},
    {name: 'massivemadness/Squircle-CE', re: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps'},
    {name: 'proninyaroslav/libretorrent', re: {include: /arm64/}},
    {name: 'RikkaApps/Shizuku'},
    {name: 'tytydraco/PDNSQS', re: {exclude: /unsigned/}},
]);
