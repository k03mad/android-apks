import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'AdguardTeam/ContentBlocker'},
    {name: 'EtchDroid/EtchDroid'},
    {name: 'imranr98/obtainium', re: {include: /arm64/}},
    {name: 'massivemadness/Squircle-CE', re: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps'},
    {name: 'SimpleMobileTools/Simple-Gallery', re: {include: /foss/}},
    {name: 'streetcomplete/StreetComplete'},
    {name: 'termux/termux-app', re: {include: /arm64/}},
]);
