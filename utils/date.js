import moment from 'moment';

/**
 * @param {string} fmt
 * @returns {string}
 */
export const getCurrentDate = (fmt = 'YYYY-MM-DD HH:mm:ss') => moment().format(fmt);
