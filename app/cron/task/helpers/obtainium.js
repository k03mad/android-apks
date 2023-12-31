import env from '../../../../env.js';

const obtainiumProto = {
    add: 'obtainium://add/',
    app: 'obtainium://app/',
};

const supportedProvidersDomains = [
    'https://apkpure.com',
    'https://appgallery.huawei.com',
    'https://f-droid.org',
    'https://github.com',
    'https://gitlab.com',
];

/**
 * @param {string} link
 */
export const getObtainiumImportSupportedLink = link => {
    for (const domain of supportedProvidersDomains) {
        if (link.startsWith(domain)) {
            return link.replace(/^https:\/\//, obtainiumProto.add);
        }
    }
};

/**
 * @param {object} apkElem
 * @param {string} apkElem.pkg
 * @param {string} apkElem.label
 * @param {string} apkElem.version
 * @param {object} apkElem.download
 * @param {string} apkElem.download.mirror
 */
export const getObtainiumImportHtmlApp = apkElem => {
    const obtainiumImportObject = {
        id: apkElem.pkg,
        url: `${env.server.domain}/apps`,
        author: 'A-APKS',
        name: apkElem.label,
        installedVersion: null,
        latestVersion: apkElem.version,
        apkUrls: JSON.stringify([
            [
                `${env.server.domain}/${apkElem.download.mirror}`,
                `${env.server.domain}/${apkElem.download.mirror}`,
            ],
        ]),
        preferredApkIndex: 0,
        additionalSettings: JSON.stringify(
            {
                sortByFileNamesNotLinks: false,
                reverseSort: false,
                supportFixedAPKURL: false,
                customLinkFilterRegex: `${apkElem.pkg}_(.+).apk$`,
                intermediateLinkRegex: '',
                versionExtractionRegEx: `${apkElem.pkg}_(.+).apk$`,
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
    };

    return obtainiumProto.app + encodeURIComponent(JSON.stringify(obtainiumImportObject));
};
