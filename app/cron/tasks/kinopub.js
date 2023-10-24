import {cleanAndDownload} from '../../../utils/aria.js';
import {getApkDir} from '../../../utils/meta.js';

const APK_DIR = getApkDir(import.meta.url);

const APK_URL = 'https://kpdl.cc/k.apk';

/** */
export default () => cleanAndDownload(APK_DIR, APK_URL);
