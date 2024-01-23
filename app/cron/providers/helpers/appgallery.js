/**
 * @param {Array<{name: string}>} apps
 */
export const getApkFromAg = apps => apps.map(({name}) => ({
    homepage: `https://appgallery.huawei.com/app/${name}`,
    link: `https://appgallery.cloud.huawei.com/appdl/${name}`,
}));
