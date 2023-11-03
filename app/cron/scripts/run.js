import env from '../../../env.js';
import {log} from '../../../utils/logs.js';
import * as _providers from '../providers/_index.js';
import {getProvidersData} from '../task/helpers/fetch.js';
import task from '../task/task.js';

const providers = {..._providers};

if (env.scripts.provider) {
    for (const key in providers) {
        if (!key.includes(env.scripts.provider)) {
            delete providers[key];
        }
    }
}

if (env.scripts.type === 'dl') {
    await task(providers, env.scripts.skipClean);
} else {
    const providersData = await getProvidersData(providers);
    log(providersData);
}
