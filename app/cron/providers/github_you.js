import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'you-apps'}];

/** */
export default () => getApkFromGhOrgs(orgs);
