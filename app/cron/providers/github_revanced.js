import {getApkFromGhUsers, getApkFromGhRepos} from './helpers/github.js';

const users = [{name: 'NoName-exe', re: {include: /mnml/, exclude: /youtube-(music-)?revanced-mnml/}}];

const repos = [{name: 'inotia00/VancedMicroG'}];

/** */
export default async () => {
    const links = await Promise.all([
        getApkFromGhUsers(users),
        getApkFromGhRepos(repos),
    ]);

    return links.flat();
};
