import {getApkFromGlRepos} from './helpers/gitlab.js';

/** */
export default () => getApkFromGlRepos([
    {name: 'asdoi/quick-tiles'},
    {name: 'sunilpaulmathew/ashell'},
]);
