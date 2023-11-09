import {getApkFromGhOrgs} from './shared/github-release.js';

const orgs = [{name: 'darkmoonight', re: {include: /arm64.+(release|floss)/}}];

/** */
export default () => getApkFromGhOrgs(orgs);
