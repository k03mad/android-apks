import {getApkFromAg} from './helpers/appgallery.js';
import {getApkFromParse} from './helpers/parse.js';

const direct = [
    {
        link: 'https://androidapp.mtsbank.ru/appdistr/MTSBank.apk',
        homepage: 'https://www.mtsbank.ru/chastnim-licam/vse-servici/mtsdengi-apk/',
    },
    {
        link: 'https://cdn.halvacard.ru/Apps/halva/GP_Halva.apk',
        homepage: 'https://pwa.sovcombank.ru/',
    },
    {
        link: 'https://cdn.psbank.ru/-/media/Files/Personal/remote/mobile/psbmobile.apk',
        homepage: 'https://www.psbank.ru/Personal/remote/inner_apps',
    },
    {
        link: 'https://vtb.com/apk/vtbonline.apk',
        homepage: 'https://www.vtb.ru/personal/online-servisy/vtb-online/',
    },
    {
        link: 'https://www.open.ru/andr',
        homepage: 'https://mobile.open.ru/',
        opts: {ua: 'curl', proxy: true},
    },
    {
        link: 'https://www.pochtabank.ru/mobappandroid',
        homepage: 'https://www.pochtabank.ru/pbo-online',
    },
];

const agApps = [
    {name: 'Абсолют', id: 'C104493061'},
    {name: 'Хоум Банк', id: 'C101185761'},
];

const parse = [
    {
        homepage: 'https://www.vbrr.ru/private/remote-service-app/',
        re: /href="(.+\.apk)"/,
        relative: true,
    },
];

/** */
export default async () => {
    const parsed = await getApkFromParse(parse);

    const ag = getApkFromAg(agApps);
    return [direct, parsed, ag].flat();
};
