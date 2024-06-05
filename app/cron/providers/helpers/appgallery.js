/**
 * @param {Array<{
 * name: string
 * opts: {ua: string, proxy: boolean, semVerRemovePatch: boolean}
 * }>} apps
 */
export const getApkFromAg = apps => apps.map(({name, opts}) => ({
    homepage: `https://appgallery.huawei.com/app/${name}`,
    link: `https://appgallery.cloud.huawei.com/appdl/${name}`,
    opts,
}));
