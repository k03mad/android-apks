import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'FossifyOrg'}];

/** */
export default () => getApkFromGhOrgs(orgs);
