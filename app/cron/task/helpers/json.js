import ms from 'ms';

import env from '../../../../env.js';

import {getObtainiumImportHtmlApp, getObtainiumImportSupportedLink} from './obtainium.js';

const formatProviderName = providerName => `./${
    providerName
        .replace(/_\d+_/, '')
        .replaceAll('_', '/')
}`;

/**
 * @param {Date} startDate
 */
export const getTimestamp = startDate => {
    const duration = Date.now() - startDate.getTime();

    return {
        duration,
        pretty: [
            startDate.toLocaleDateString(),
            startDate.toLocaleTimeString(),
            `+${ms(Date.now() - startDate.getTime())}`,
        ].join(' '),
    };
};

/**
 * @param {object} json
 * @param {object} json.apk
 * @param {Array<string>} json.errors
 */
export const sortData = json => {
    const cloneJson = structuredClone(json);

    // app labels
    Object
        .keys(cloneJson.apk)
        .forEach(providerName => cloneJson.apk[providerName].sort((a, b) => a.label?.localeCompare(b.label)));

    // app providers
    cloneJson.apk = Object
        .keys(cloneJson.apk)
        .sort()
        .reduce((obj, providerName) => {
            obj[formatProviderName(providerName)] = cloneJson.apk[providerName];
            return obj;
        }, {});

    // app errors
    cloneJson.errors.sort();

    return cloneJson;
};

/**
 * @param {object} json
 * @param {object} json.apk
 */
export const addObtainiumLinks = json => {
    if (env.server.domain) {
        const cloneJson = structuredClone(json);

        Object
            .keys(cloneJson.apk)
            .forEach(providerName => {
                cloneJson.apk[providerName].forEach(elem => {
                    elem.obtainium = {
                        mirror: getObtainiumImportHtmlApp(elem),
                    };

                    const originalSupportedLink = getObtainiumImportSupportedLink(elem.homepage);

                    if (originalSupportedLink) {
                        elem.obtainium.original = originalSupportedLink;
                    }
                });
            });

        return cloneJson;
    }

    return json;
};
