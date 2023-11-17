import {getApkFromGhRepos, getApkFromGhUsers} from './helpers/github.js';

const repos = [
    {name: 'inotia00/mMicroG', re: {include: /arm64/}},
    {name: 'inotia00/VancedMicroG'},
];

const users = [{name: 'NoName-exe', re: {include: /all|arm64/, exclude: /youtube.+mnml/}}];

/** */
export default async () => {
    const data = await Promise.all([
        getApkFromGhRepos(repos),
        getApkFromGhUsers(users),
    ]);

    return data.flat();
};
