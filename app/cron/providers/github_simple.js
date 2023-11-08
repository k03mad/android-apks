import {getApkFromGhOrgs} from './shared/github-release.js';

const orgs = [{name: 'SimpleMobileTools', re: {exclude: /proprietary/}}];

/**
 * @returns {Promise<Array<{link: string, opts: object}>>}
 */
export default () => getApkFromGhOrgs(orgs);
