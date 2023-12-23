process.env.NODE_ENV = 'production';

const env = {
    'server': {
        domain: process.env.AAPKS_DOMAIN,
        port: process.env.npm_config_port || 13_010
    },
    'debug': process.env.DEBUG,
    'scripts': {
        provider: process.env.npm_config_provider,
        type: process.env.TYPE,
    },
    'github': {
        token: process.env.AAPKS_GITHUB_TOKEN,
    },
    '4pda': {
        memberId: process.env.AAPKS_4PDA_MEMBER_ID,
        passHash: process.env.AAPKS_4PDA_PASS_HASH,
    },
    'aria': {
        proxy: process.env.AAPKS_ARIA_PROXY,
    },
};

export default env;
