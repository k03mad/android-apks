process.env.NODE_ENV = 'production';

const env = {
    server: {
        port: process.env.npm_config_port || 13_010,
    },
    debug: process.env.DEBUG,
    scripts: {
        skipClean: process.env.npm_config_skip_clean,
    },
    log: {
        path: './process.log',
    },
};

export default env;
