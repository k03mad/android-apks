import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'termux', re: {exclude: /universal|x86|v7a/}}];

/** */
export default () => getApkFromGhOrgs(orgs);
