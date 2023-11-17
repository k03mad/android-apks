import {getApkFromGhRepos, getApkFromGhUsers} from './helpers/github.js';

const repos = [
    // {name: 'libre-tube/LibreTube', re: {include: /arm64/}},
    // {name: 'polymorphicshade/NewPipe'},
    // {name: 'revanced/revanced-manager'},
    // {name: 'TeamNewPipe/NewPipe'},
    {name: 'yuliskov/SmartTube', re: {include: /arm64/}},
];

const users = [{name: 'inotia00'}];

/** */
export default async () => {
    const data = await Promise.all([
        getApkFromGhRepos(repos),
        getApkFromGhUsers(users),
    ]);

    return data.flat();
};
