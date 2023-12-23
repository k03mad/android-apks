/**
 * @param {Array<{id: string}>} apps
 */
export const getApkFromAg = apps => apps.map(({id}) => ({
    homepage: `https://appgallery.huawei.com/app/${id}`,
    link: `https://appgallery.cloud.huawei.com/appdl/${id}`,
}));
