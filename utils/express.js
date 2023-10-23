/**
 * @param {object} route
 * @returns {string}
 */
export const getRoutePath = route => route.stack?.[0].route.path;
