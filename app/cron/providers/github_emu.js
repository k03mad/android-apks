import {getApkFromGhRepos} from './helpers/github.js';

/** */
export default () => getApkFromGhRepos([
    {
        name: 'Rakashazi/emu-ex-plus-alpha',
        archive: 'zip',
        filter: {include: /MdEmu|NesEmu|Snes9xEXPlus/},
    },
]);
