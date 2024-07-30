import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'organicmaps/organicmaps', filter: {include: /web/}},
    {name: 'streetcomplete/StreetComplete'},
]);
