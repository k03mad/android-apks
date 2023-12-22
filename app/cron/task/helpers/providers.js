/**
 * @param {object} providers
 */
export const removeStartUnderline = providers => {
    const UNDERLINE = '_';
    const cloneProviders = {...providers};

    Object.keys(cloneProviders).forEach(provider => {
        if (provider.startsWith(UNDERLINE)) {
            cloneProviders[provider.replace(UNDERLINE, '')] = cloneProviders[provider];
            delete cloneProviders[provider];
        }
    });

    return cloneProviders;
};
