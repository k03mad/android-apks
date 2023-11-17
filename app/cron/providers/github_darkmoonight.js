import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'darkmoonight', re: {include: /arm64.+(release|floss)/}}];

/** */
export default () => getApkFromGhOrgs(orgs);
