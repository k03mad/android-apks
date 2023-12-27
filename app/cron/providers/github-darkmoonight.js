import {getApkFromGhOrgs} from './helpers/github.js';

const orgs = [{name: 'darkmoonight', re: {include: /arm64.+(floss|release)/}}];

/** */
export default () => getApkFromGhOrgs(orgs);
