import ms from 'ms';

import env from '../../../../env.js';

const formatProviderName = providerName => `./${
    providerName
        .replace(/_\d+_/, '')
        .replaceAll('_', '/')
}`;

/**
 * @param {Date} startDate
 */
export const getTimestamp = startDate => [
    startDate.toLocaleDateString(),
    startDate.toLocaleTimeString(),
    `+${ms(Date.now() - startDate.getTime())}`,
].join(' ');

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
                    if (elem.homepage) {
                        elem.obtainium = {
                            original: elem.homepage.replace(/^http(s)?:\/\//, 'obtainium://add/'),
                            mirror: `obtainium://app/${encodeURIComponent(
                                JSON.stringify({
                                    id: elem.pkg,
                                    url: `${env.server.domain}/apps`,
                                    author: 'A-APKS',
                                    name: elem.label,
                                    installedVersion: null,
                                    latestVersion: elem.version,
                                    apkUrls: null,
                                    // apkUrls: JSON.stringify([
                                    //     [
                                    //         `${env.server.domain}/${elem.download?.mirror}`,
                                    //         `${env.server.domain}/${elem.download?.mirror}`,
                                    //     ],
                                    // ]),
                                    preferredApkIndex: 0,
                                    additionalSettings: JSON.stringify(
                                        {
                                            sortByFileNamesNotLinks: false,
                                            reverseSort: false,
                                            supportFixedAPKURL: false,
                                            customLinkFilterRegex: `${elem.pkg}_(.+).apk$`,
                                            intermediateLinkRegex: '',
                                            versionExtractionRegEx: `${elem.pkg}_(.+).apk$`,
                                            matchGroupToUse: '1',
                                            versionExtractWholePage: false,
                                            trackOnly: false,
                                            versionDetection: 'noVersionDetection',
                                            apkFilterRegEx: '',
                                            autoApkFilterByArch: true,
                                            appName: '',
                                            exemptFromBackgroundUpdates: false,
                                            skipUpdateNotifications: false,
                                            about: '',
                                        },
                                    ),
                                    lastUpdateCheck: 1_000_000_000_000_000,
                                    pinned: false,
                                    categories: [],
                                    releaseDate: null,
                                    changeLog: null,
                                    overrideSource: 'HTML',
                                    allowIdChange: false,
                                }),
                            )}`,
                        };
                    }
                });
            });
    }
};
