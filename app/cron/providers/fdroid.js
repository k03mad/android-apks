import {getApkFromFd} from './helpers/fdroid.js';

/** */
export default () => getApkFromFd([
    {pkg: 'com.atharok.barcodescanner'},
    {pkg: 'net.osmand.plus'},
]);
