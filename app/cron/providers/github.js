import {getApkFromGhRepo} from './shared/github-release.js';

const repos = [
    'bravenewpipe/NewPipe',
    'libre-tube/LibreTube',
    'M66B/NetGuard',
    'massivemadness/Squircle-CE',
    'organicmaps/organicmaps',
    'polymorphicshade/NewPipe',
    'streetcomplete/StreetComplete',
    'TeamNewPipe/NewPipe',
    'termux/termux-app',
    'yuliskov/SmartTube',
];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default () => getApkFromGhRepo(repos);
