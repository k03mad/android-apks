import os from 'node:os';

import client from 'prom-client';

import env from '../../env.js';
import {packageJson} from '../../utils/meta.js';

const register = new client.Registry();

client.collectDefaultMetrics({register});

register.setDefaultLabels({
    app: packageJson.name,
    host: os.hostname,
    port: env.server.port,
});
