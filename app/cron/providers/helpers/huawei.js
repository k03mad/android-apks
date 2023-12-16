/**
 * @param {string} id
 */
const getApkLinks = id => {
    const homepage = `https://appgallery.huawei.com/app/${id}`;
    return {
        homepage,
        link: `https://appgallery.cloud.huawei.com/appdl/${id}`,
    };
};

/**
 * @param {Array<string>} ids
 */
export const getApkFromAgIds = ids => ids.map(id => getApkLinks(id));
