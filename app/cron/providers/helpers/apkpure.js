/**
 * @param {string} id
 */
const getApkLinks = id => {
    const [, pkg] = id.split('/');
    const homepage = `https://apkpure.com/${id}`;

    return {
        homepage,
        link: `https://d.apkpure.com/b/APK/${pkg}?version=latest`,
        opts: {ua: 'aria'},
    };
};

/**
 * @param {Array<string>} ids
 */
export const getApkFromApIds = ids => ids.map(id => getApkLinks(id));
