/**
 * @param {number} [ts]
 */
export const getDateYMD = ts => {
    const date = ts ? new Date(ts) : new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [
        year,
        String(month).length === 1 ? `0${month}` : month,
        String(day).length === 1 ? `0${day}` : day,
    ].join('-');
};
