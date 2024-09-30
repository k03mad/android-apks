import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'DP-Hridayan/aShellYou'},
    {name: 'kyujin-cho/pixel-volte-patch'},
    {name: 'RikkaApps/Shizuku'},
    {name: 'tytydraco/PDNSQS', filter: {exclude: /unsigned/}},
]);
