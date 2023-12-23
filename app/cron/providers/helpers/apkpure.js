/**
 * @param {Array<{path: string}>} apps
 */
export const getApkFromAp = apps => apps.map(({path}) => {
    const [, pkg] = path.split('/');
    const homepage = `https://apkpure.com/${path}`;

    return {
        homepage,
        link: `https://d.apkpure.com/b/APK/${pkg}?version=latest`,
        opts: {ua: 'aria'},
    };
});
