import {getObtainiumImportAdd} from './obtainium.js';

/**
 * @param {string} id
 * @returns {Promise<{link: string, homepage: string}>}
 */
const getApkLinks = id => {
    const homepage = `https://appgallery.huawei.com/app/${id}`;
    return {
        homepage,
        link: `https://appgallery.cloud.huawei.com/appdl/${id}`,
        obtainium: getObtainiumImportAdd(homepage),
    };
};

/**
 * @param {Array<string>} ids
 * @returns {Array<{link: string, homepage: string}>}
 */
export const getApkFromAgIds = ids => ids.map(id => getApkLinks(id));
