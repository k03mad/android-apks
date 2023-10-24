/**
 * @returns {string}
 */
export const getCurrentDate = () => {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
