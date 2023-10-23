import {cleanFolderDownloadApk} from '../../../utils/aria.js';
import {getCurrentFilename} from '../../../utils/files.js';
import config from '../../server/config.js';

const APK_DIR = `${config.static.apk}/${getCurrentFilename(import.meta.url)}`;

const APK_URL = 'https://disk.2gis.com/android/Latest/2GIS.apk';

/**
 * @returns {Promise<void>}
 */
export default () => cleanFolderDownloadApk(APK_DIR, APK_URL);
