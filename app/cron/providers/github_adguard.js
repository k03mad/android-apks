import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'AdguardTeam'}];

/** */
export default () => getApkFromGhOrgs(orgs);
