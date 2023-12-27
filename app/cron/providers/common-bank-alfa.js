import {getApkFromAg} from './helpers/appgallery.js';

const direct = [
    {link: 'https://alfamobile-web.servicecdn.ru/latest/alfa-bank.apk'},
    {link: 'https://alfainvest-web.servicecdn.ru/invest-android/latest/a-investments.apk'},
    {link: 'https://alfabusinessmobile.servicecdn.ru/abm/latest/ABM-release.apk'},
].map(elem => ({...elem, homepage: 'https://alfabank.ru/apps/'}));

const agApps = [{name: 'АльфаСтрахование', id: 'C103154181'}];

/** */
export default () => {
    const ag = getApkFromAg(agApps);
    return [direct, ag].flat();
};
