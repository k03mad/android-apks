import fs from 'node:fs/promises';
import os from 'node:os';

import express from 'express';
import client from 'prom-client';

import env from '../../../env.js';
import {logError} from '../../../utils/logs.js';
import {packageJson} from '../../../utils/meta.js';
import cronConfig from '../../cron/config.js';

const router = express.Router();
const register = new client.Registry();

client.collectDefaultMetrics({register});

register.setDefaultLabels({
    app: packageJson.name,
    host: os.hostname,
    port: env.server.port,
});

const gauge = new client.Gauge({
    name: 'aapks',
    help: 'aapks-metrics',
    labelNames: ['type', 'ext', 'label', 'version', 'size', 'date'],

    async collect() {
        try {
            this.reset();

            const dataFile = await fs.readFile(cronConfig.json.file);
            const parsed = JSON.parse(dataFile);

            const {apk, errors, timestamp} = parsed;
            const providers = Object.keys(apk);
            const apps = Object.values(apk).flat();

            this.labels('timestamp', timestamp, null, null, null, null).set(1);
            this.labels('providers-count', null, null, null, null, null).set(providers.length);
            this.labels('apps-count', null, null, null, null, null).set(apps.length);

            apps.forEach(app => {
                this.labels('apps', null, app.label, app.version, app.size.raw, app.date || null).set(1);
            });

            this.labels('errors-count', null, null, null, null, null).set(errors.length);

            errors.forEach(error => {
                this.labels('errors', error, null, null, null, null).set(1);
            });
        } catch (err) {
            logError(err);
        }
    },
});

register.registerMetric(gauge);

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
