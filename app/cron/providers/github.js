import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'AdguardTeam/ContentBlocker'},
    {name: 'Aefyr/SAI'},
    {name: 'Catfriend1/syncthing-android', filter: {exclude: /fdroid|gplay/}},
    {name: 'imranr98/obtainium', filter: {include: /arm64/, exclude: /fdroid/}},
    {name: 'massivemadness/Squircle-CE', filter: {include: /fdroid/}},
    {name: 'MuntashirAkon/AppManager'},
    {name: 'organicmaps/organicmaps', filter: {include: /web/}},
    {name: 'proninyaroslav/libretorrent', filter: {include: /arm64/}},
    {name: 'revanced-apks/build-apps', filter: {include: /(music|youtube)-revanced-extended-.+-(all|arm64)/}},
    {name: 'ReVanced/GmsCore', filter: {exclude: /-hw-/}},
    {name: 'streetcomplete/StreetComplete', skipPrerelease: true},
    {name: 'termux/termux-app', skipPrerelease: true, filter: {include: /arm64/}},
]);
