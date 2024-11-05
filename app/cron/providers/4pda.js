import {getApkFrom4Pda} from './helpers/4pda.js';

/** */
export default () => getApkFrom4Pda([
    {name: '4PDA', showtopic: 673_755},
    {name: 'App&Game 4PDA', showtopic: 275_433},
    {name: 'Brotato', showtopic: 1_059_651, filter: {exclude: /Brotato_1_1_5_1_AT.apk$/}},
    {name: 'Network Analyzer', showtopic: 969_002, file: '29505175/Network_Analyzer_3.12_mod_traceroute_fix.apk'},
    {name: 'WIBR+', showtopic: 474_979},
    {name: 'Wps Wpa Tester', showtopic: 677_091},
    {name: 'WPSApp', showtopic: 809_457},
    {name: 'X-plore', showtopic: 178_924, filter: {exclude: /black|gdrive|mod|root/i}},
]);
