import {getApkFromGhOrgs} from './shared/github-release.js';

const orgs = [{name: 'darkmoonight', re: {include: /arm64.+(release|floss)/}}];

/**
 * @returns {Promise<Array<{link: string, opts: object}>>}
 */
export default () => getApkFromGhOrgs(orgs);
