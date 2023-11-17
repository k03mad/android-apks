import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'HardcodedCat'}];

/** */
export default () => getApkFromGhOrgs(orgs);
