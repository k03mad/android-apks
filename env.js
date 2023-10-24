process.env.NODE_ENV = 'production';

const env = {
    server: {
        port: process.env.npm_config_port || 13_010,
    },
    cron: {
        name: process.env.npm_config_name,
    },
    debug: process.env.DEBUG,
};

export default env;
