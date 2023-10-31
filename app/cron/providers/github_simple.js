import {getApkFromGhOrg} from './shared/github-release.js';

const orgs = {name: 'SimpleMobileTools', re: {exclude: /proprietary/}};

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default () => getApkFromGhOrg(orgs);
