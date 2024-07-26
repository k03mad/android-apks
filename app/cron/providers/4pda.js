import {getApkFrom4Pda} from './helpers/4pda.js';

/** */
export default () => getApkFrom4Pda([
    {name: '4PDA', showtopic: 673_755},
    {name: 'Чей номер', showtopic: 1_071_145},
    {name: 'AnyBalance', showtopic: 300_836},
    {name: 'App&Game 4PDA', showtopic: 275_433},
    {name: 'Brotato Mobile', showtopic: 1_059_651},
    {name: 'WIBR+', showtopic: 474_979},
    {name: 'Wps Wpa Tester', showtopic: 677_091},
    {name: 'WPSApp', showtopic: 809_457},
    {name: 'X-plore', showtopic: 178_924, filter: {exclude: /black|root/i}},
]);
