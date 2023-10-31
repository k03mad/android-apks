import env from '../../../env.js';
import {log} from '../../../utils/logs.js';
import * as _providers from '../providers/_index.js';
import {downloadApk, getData} from './download.js';

const providers = {..._providers};

if (env.scripts.provider) {
    for (const key in providers) {
        if (!key.includes(env.scripts.provider)) {
            delete providers[key];
        }
    }
}

if (env.scripts.type === 'dl') {
    await downloadApk(providers, env.scripts.skipClean);
} else {
    const providersData = await getData(providers);
    log(providersData);
}
