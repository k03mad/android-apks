import {getApkFromFdPackages} from './helpers/fdroid.js';
import {getApkFromAgIds} from './helpers/huawei.js';

const direct = [
    {
        link: 'https://d.tap.io/latest',
        homepage: 'https://www.taptap.io/mobile',
    },
    {
        link: 'https://www.rustore.ru/download',
        homepage: 'https://www.rustore.ru/instruction.html',
    },
];

const agIds = [
    // com.huawei.appmarket
    'C27162',
];

const fdPkg = [
    'com.aurora.store',
    'org.fdroid.fdroid',
];

/** */
export default async () => {
    const fromStores = await Promise.all([
        getApkFromAgIds(agIds),
        getApkFromFdPackages(fdPkg),
    ]);

    return [direct, fromStores].flat();
};
