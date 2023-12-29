import {getApkFromFd} from './helpers/fdroid.js';

/** */
export default () => getApkFromFd([
    {pkg: 'com.atharok.barcodescanner'},
    {pkg: 'com.foxdebug.acode'},
    {pkg: 'net.osmand.plus'},
    {pkg: 'org.fdroid.fdroid'},
]);
