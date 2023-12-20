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
    // app labels
    Object
        .keys(json.apk)
        .forEach(providerName => json.apk[providerName].sort((a, b) => a.label?.localeCompare(b.label)));

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

/**
 * @param {object} json
 * @param {object} json.apk
 */
export const addObtainiumLinks = json => {
    if (env.server.domain) {
        Object
            .keys(json.apk)
            .forEach(providerName => {
                json.apk[providerName].forEach(elem => {
                    elem.obtainium = {
                        mirror: getObtainiumImportHtmlApp(elem),
                    };

                    const originalSupportedLink = getObtainiumImportSupportedLink(elem.homepage);

                    if (originalSupportedLink) {
                        elem.obtainium.original = originalSupportedLink;
                    }
                });
            });
    }
};
