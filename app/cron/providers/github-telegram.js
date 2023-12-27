import {getApkFromGhRepos} from './helpers/github.js';

const direct = [
    {
        link: 'https://telegram.org/dl/android/apk',
        homepage: 'https://telegram.org/android',
    },
];

const repos = [
    {name: 'arsLan4k1390/Cherrygram', re: {include: /arm64/, exclude: /huawei/i}},
    {name: 'forkgram/TelegramAndroid'},
    {name: 'moeCrafters/moeGramX', re: {include: /arm64/}},
    {name: 'Nekogram/Nekogram', re: {include: /arm64/}},
    {name: 'NekoX-Dev/NekoX', re: {include: /full-arm64.+release.apk/}},
    {name: 'NextAlone/Nagram', re: {include: /arm64/, exclude: /nogcm/i}},
    {name: 'Telegram-FOSS-Team/Telegram-FOSS'},
];

/** */
export default async () => {
    const ghLinks = await getApkFromGhRepos(repos);
    return [ghLinks, direct].flat();
};
