/**
 * @param {string} pkg
 * @returns {Promise<{link: string, homepage: string}>}
 */
const getApkLinks = pkg => ({
    homepage: `https://apkpure.com/search?q=${pkg}`,
    link: `https://d.apkpure.com/b/APK/${pkg}?version=latest`,
    opts: {ua: 'aria'},
});

/**
 * @param {Array<string>} pkgs
 * @returns {Array<{link: string, homepage: string}>}
 */
export const getApkFromApPkgs = pkgs => pkgs.map(pkg => getApkLinks(pkg));
