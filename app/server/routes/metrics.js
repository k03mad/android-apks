import os from 'node:os';

import express from 'express';
import client from 'prom-client';

import env from '../../../env.js';
import {packageJson} from '../../../utils/meta.js';

const router = express.Router();
const register = new client.Registry();

client.collectDefaultMetrics({register});

register.setDefaultLabels({
    app: packageJson.name,
    host: os.hostname,
    port: env.server.port,
});

export default router.get(
    '/metrics', async (req, res, next) => {
        try {
            const metrics = await register.metrics();

            res.setHeader('Content-Type', register.contentType);
            res.send(metrics);
        } catch (err) {
            next(err);
        }
    },
);
