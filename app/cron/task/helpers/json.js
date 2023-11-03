import ms from 'ms';

/**
 * @param {string} providerName
 * @returns {string}
 */
const formatProviderName = providerName => `./${
    providerName
        .replace(/_\d+_/, '')
        .replaceAll('_', '/')
}`;

/**
 * @param {number} start
 */
export const getTimestamp = start => {
    const date = new Date();

    return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        `+${ms(Date.now() - start)}`,
    ].join(' ');
};

/**
 * @param {object} json
 * @param {object} json.apk
 * @param {Array<string>} json.errors
 */
export const sortData = json => {
    // app labels
    Object
        .keys(json.apk)
        .forEach(elem => json.apk[elem].sort((a, b) => a.label?.localeCompare(b.label)));

    // app providers
    json.apk = Object
        .keys(json.apk)
        .sort()
        .reduce((obj, providerName) => {
            obj[formatProviderName(providerName)] = json.apk[providerName];
            return obj;
        }, {});

    // app errors
    json.errors.sort();
};
