import {getApkFromGhUsers} from './helpers/github.js';

const users = [{name: 'NoName-exe', re: {include: /all|arm64/}}];

/** */
export default () => getApkFromGhUsers(users);
