/**
 * @param {string} url
 */
export const getObtainiumImportAdd = url => url.replace(
    /^http(s)?:\/\//,
    'obtainium://add/',
);
