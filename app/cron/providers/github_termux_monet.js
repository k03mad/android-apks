import {getApkFromGhUsers} from './helpers/github.js';

const orgs = [{name: 'HardcodedCat', re: {exclude: /universal|x86|v7a/}}];

/** */
export default () => getApkFromGhUsers(orgs);
