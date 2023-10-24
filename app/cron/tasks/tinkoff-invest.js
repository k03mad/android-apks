import {getApkDir} from '../../../utils/meta.js';
import getTinkoffApk from './common/tinkoff.js';

const APK_DIR = getApkDir(import.meta.url);

const APK_URL_INCLUDES = 'Tinkoff_Invest';

/** */
export default () => getTinkoffApk(APK_DIR, APK_URL_INCLUDES);
