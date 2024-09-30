import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'reqable/reqable-app', filter: {include: /arm64/}},
    {name: 'topjohnwu/Magisk', skipPrerelease: true},
]);
