import {getApkFromGhRepos} from './shared/github.js';

const repos = [
    {name: 'AdAway/AdAway'},
    {name: 'bravenewpipe/NewPipe', re: {exclude: /conscrypt/}},
    {name: 'celzero/rethink-app'},
    {name: 'Chooloo/koler'},
    {name: 'deckerst/aves', re: {include: /libre-arm64/}},
    {name: 'imranr98/obtainium'},
    {name: 'libre-tube/LibreTube', re: {include: /arm64/}},
    {name: 'M66B/NetGuard'},
    {name: 'markusfisch/BinaryEye'},
    {name: 'massivemadness/Squircle-CE', re: {include: /fdroid/}},
    {name: 'moezbhatti/qksms'},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps'},
    {name: 'polymorphicshade/NewPipe'},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'TeamNewPipe/NewPipe'},
    {name: 'termux/termux-app', re: {include: /arm64/}},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
];

/** */
export default () => getApkFromGhRepos(repos);
