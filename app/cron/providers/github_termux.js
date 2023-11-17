import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'termux', re: {exclude: /universal|x86|v7a|nightly/}}];

/** */
export default () => getApkFromGhOrgs(orgs);
