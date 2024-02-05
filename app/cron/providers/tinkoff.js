import {getApkFromTinkoff} from './helpers/tinkoff.js';

/** */
export default () => getApkFromTinkoff([
    {name: 'tinkoff-bank'},
    {name: 'tinkoff_invest'},
    {name: 'tinkoff_mobile'},
]);
