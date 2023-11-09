import {getApkFromGhOrgs} from './shared/github-release.js';

const orgs = [{name: 'SimpleMobileTools', re: {exclude: /proprietary/}}];

/** */
export default () => getApkFromGhOrgs(orgs);
