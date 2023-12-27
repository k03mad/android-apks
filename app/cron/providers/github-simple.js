import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'SimpleMobileTools', re: {exclude: /proprietary/}}];

/** */
export default () => getApkFromGhOrgs(orgs);
