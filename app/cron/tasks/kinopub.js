import {cleanAndDownload} from '../../../utils/aria.js';
import {getCurrentFilename} from '../../../utils/files.js';
import config from '../../server/config.js';

const APK_DIR = `${config.static.apk}/${getCurrentFilename(import.meta.url)}`;

const APK_URL = 'https://kpdl.cc/k.apk';

/** */
export default () => cleanAndDownload(APK_DIR, APK_URL);
