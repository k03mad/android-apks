/**
 * @param {Array<{
 * name: string
 * opts: {ua: string, proxy: boolean, semVerRemovePatch: boolean}
 * }>} apps
 */
export const getApkFromAp = apps => apps.map(({name, opts = {}}) => {
    const [, pkg] = name.split('/');
    const homepage = `https://apkpure.com/${name}`;

    return {
        homepage,
        link: `https://d.cdnpure.com/b/APK/${pkg}?version=latest`,
        opts,
    };
});
