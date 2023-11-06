import {getApkFromGhUsers} from './shared/github-release.js';

const users = [
    {name: 'inotia00'},
    {name: 'revanced'},
    {name: 'NoName-exe'},
];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default () => getApkFromGhUsers(users);
