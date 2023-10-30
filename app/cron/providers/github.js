import {getApkFromGhRepo} from './shared/github-release.js';

const repos = [
    'massivemadness/Squircle-CE',
    'organicmaps/organicmaps',
    'polymorphicshade/NewPipe',
    'streetcomplete/StreetComplete',
    'yuliskov/SmartTube',
];

/**
 * @returns {Promise<Array<{link: string}>>}
 */
export default () => getApkFromGhRepo(repos);
