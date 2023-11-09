import {getApkFromGhOrgs} from './shared/github.js';

const orgs = [{name: 'AdguardTeam'}];

/** */
export default () => getApkFromGhOrgs(orgs);
