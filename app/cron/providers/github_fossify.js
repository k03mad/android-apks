import {getApkFromGhOrgs} from './helpers/github.js';

/** */
export default () => getApkFromGhOrgs([{name: 'FossifyOrg', skipEmptyCheck: true}]);
