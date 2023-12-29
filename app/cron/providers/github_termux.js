import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'termux', re: {exclude: /nightly|universal|v7a|x86/}}];

/** */
export default () => getApkFromGhOrgs(orgs);
