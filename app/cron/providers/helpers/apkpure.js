/**
 * @param {Array<{name: string}>} apps
 */
export const getApkFromAp = apps => apps.map(({name}) => {
    const [, pkg] = name.split('/');
    const homepage = `https://apkpure.com/${name}`;

    return {
        homepage,
        link: `https://d.cdnpure.com/b/APK/${pkg}?version=latest`,
        opts: {ua: 'aria'},
    };
});
