const prefixZero = datePart => String(datePart).length === 1
    ? `0${datePart}`
    : datePart;

/**
 * @param {number|string} [init]
 * @param {object} [opts]
 * @param {string} [opts.ymdSeparator]
 */
export const getDateYMD = (init, {ymdSeparator = '-'} = {}) => {
    const date = init ? new Date(init) : new Date();

    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
    ].map(elem => prefixZero(elem)).join(ymdSeparator);
};
