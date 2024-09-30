import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {name: 'lampa-app/LAMPA'},
    {name: 'Sheinices/Prisma_TV'},
    {name: 'theothernt/AerialViews'},
    {name: 'truefedex/tv-bro', filter: {include: /arm64/}},
    {name: 'YouROK/TorrServe'},
    {name: 'yuliskov/SmartTube', skipPrerelease: true, filter: {include: /arm64/}},
]);
