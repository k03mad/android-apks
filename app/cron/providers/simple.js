import {getApkFromGhOrg} from './shared/github-release.js';

const REPO_ORG = 'SimpleMobileTools';

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default () => getApkFromGhOrg(REPO_ORG);
