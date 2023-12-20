import _ from 'lodash';

/**
 * @param {object} providers
 */
export const removeStartUnderline = providers => {
    Object.keys(_.cloneDeep(providers)).forEach(provider => {
        if (provider.startsWith('_')) {
            providers[provider.replace(/^_/, '')] = providers[provider];
            delete providers[provider];
        }
    });

    return providers;
};
