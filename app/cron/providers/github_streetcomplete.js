import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'streetcomplete'}];

/** */
export default () => getApkFromGhOrgs(orgs);
