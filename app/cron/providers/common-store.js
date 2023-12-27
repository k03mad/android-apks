import {getApkFromAg} from './helpers/appgallery.js';

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

const agApps = [{name: 'AppGallery', id: 'C27162'}];

/** */
export default () => {
    const ag = getApkFromAg(agApps);
    return [direct, ag].flat();
};
