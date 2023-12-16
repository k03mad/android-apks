import {getObtainiumImportAdd} from './obtainium.js';

/**
 * @param {string} id
 * @returns {Promise<{link: string, homepage: string}>}
 */
const getApkLinks = id => {
    const [, pkg] = id.split('/');
    const homepage = `https://apkpure.com/${id}`;

    return {
        homepage,
        link: `https://d.apkpure.com/b/APK/${pkg}?version=latest`,
        obtainium: getObtainiumImportAdd(homepage),
        opts: {ua: 'aria'},
    };
};

/**
 * @param {Array<string>} ids
 * @returns {Array<{link: string, homepage: string}>}
 */
export const getApkFromApIds = ids => ids.map(id => getApkLinks(id));
