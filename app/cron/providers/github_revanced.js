import {getApkFromGhUsers} from './helpers/github.js';

const users = [{name: 'NoName-exe', re: {include: /mnml/, exclude: /youtube-(music-)?revanced-mnml/}}];

/** */
export default () => getApkFromGhUsers(users);
