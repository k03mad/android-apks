/**
 * @param {string} id
 * @returns {Promise<{link: string, homepage: string}>}
 */
const getApkLinks = id => ({
    homepage: `https://appgallery.huawei.com/app/${id}`,
    link: `https://appgallery.cloud.huawei.com/appdl/${id}`,
});

/**
 * @param {Array<string>} ids
 * @returns {Promise<Array<{link: string, homepage: string}>>}
 */
export const getApkFromIds = ids => ids.map(id => getApkLinks(id));
