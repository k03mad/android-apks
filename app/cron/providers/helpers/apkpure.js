/**
 * @param {string} id
 * @returns {Promise<{link: string, homepage: string}>}
 */
const getApkLinks = id => {
    const [, pkg] = id.split('/');

    return {
        homepage: `https://apkpure.com/${id}`,
        link: `https://d.apkpure.com/b/APK/${pkg}?version=latest`,
        opts: {ua: 'aria'},
    };
};

/**
 * @param {Array<string>} ids
 * @returns {Array<{link: string, homepage: string}>}
 */
export const getApkFromApIds = ids => ids.map(id => getApkLinks(id));
