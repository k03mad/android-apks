import {getApkFromGhOrgs, getApkFromGhUsers} from './helpers/github.js';

/** */
export default async () => {
    const links = await Promise.all([
        getApkFromGhUsers([
            {name: 'MuntashirAkon'},
            {name: 'imranr98'},
            {name: 'kyujin-cho'},
            {name: 'massivemadness'},
        ]),
        getApkFromGhOrgs([
            {name: 'EtchDroid'},
            {name: 'organicmaps'},
            {name: 'RikkaApps'},
            {name: 'streetcomplete'},
            {name: 'termux'},
        ]),
    ]);

    return links.flat();
};
