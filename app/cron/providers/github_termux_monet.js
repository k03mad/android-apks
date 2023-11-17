import {getApkFromGhUsers} from './helpers/github.js';

const orgs = [{name: 'HardcodedCat'}];

/** */
export default () => getApkFromGhUsers(orgs);
