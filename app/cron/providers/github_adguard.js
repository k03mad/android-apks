import {getApkFromGhOrgs} from './shared/github-release.js';

const orgs = [{name: 'AdguardTeam'}];

/** */
export default () => getApkFromGhOrgs(orgs);
