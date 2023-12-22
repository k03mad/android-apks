import env from '../../../env.js';
import {log} from '../../../utils/logs.js';
import * as _providers from '../providers/_index.js';
import {getProvidersData} from '../task/helpers/fetch.js';
import {removeStartUnderline} from '../task/helpers/providers.js';
import task from '../task/task.js';

const providers = removeStartUnderline(_providers);

if (env.scripts.provider) {
    for (const key in providers) {
        let eq = false;

        env.scripts.provider.split(',').forEach(provider => {
            if (key === provider) {
                eq = true;
            }
        });

        if (!eq) {
            delete providers[key];
        }
    }
}

if (env.scripts.type === 'dl') {
    await task(providers);
} else {
    const providersData = await getProvidersData(providers);
    log(providersData);
}
