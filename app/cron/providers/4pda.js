import {getApkFrom4Pda} from './helpers/4pda.js';

/** */
export default () => getApkFrom4Pda([
    {name: '4PDA', showtopic: 673_755},
    {name: 'Чей номер', showtopic: 1_071_145},
    {name: 'AnyBalance', showtopic: 300_836},
    {name: 'App&Game 4PDA', showtopic: 275_433},
    {name: 'Brotato', showtopic: 1_059_651},
    {name: 'Network Analyzer', showtopic: 969_002},
    {name: 'X-plore', showtopic: 178_924, filter: {exclude: /black|mod|root/i}},
]);
