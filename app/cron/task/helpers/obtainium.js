import env from '../../../../env.js';
import serverConfig from '../../../server/config.js';

const obtainiumProto = {
    add: 'obtainium://add/',
    app: 'obtainium://app/',
};

/**
 * @param {string} link
 */
export const getObtainiumImportSupportedLink = link => link.replace(/^http(s)?:\/\//, obtainiumProto.add);

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
        url: `${env.server.domain}/${serverConfig.url.appsPath}`,
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
