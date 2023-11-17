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

/** */
export default () => {
    const ag = getApkFromAgIds(agIds);
    return [direct, ag].flat();
};
