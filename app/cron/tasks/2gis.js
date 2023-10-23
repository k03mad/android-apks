import {download} from '../../../utils/aria.js';
import {cleanFolder, getCurrentFilename} from '../../../utils/files.js';
import config from '../../server/config.js';

const APK_DIR = `${config.static.apk}/${getCurrentFilename(import.meta.url)}`;

const APK_URL = 'https://disk.2gis.com/android/Latest/2GIS.apk';

/**
 * @returns {{interval: string, task: Function}}
 */
export default {
    interval: '30 */12 * * *',

    task: async () => {
        await cleanFolder(APK_DIR);
        await download(APK_DIR, APK_URL);
    },
};
