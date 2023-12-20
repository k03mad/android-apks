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

const labelNames = ['type', 'ext', 'ext2', 'ext3', 'ext4'];

// fill with nulls
const addLabels = (ctx, ...labels) => ctx.labels(
    ...labels,
    ...Array.from({length: labelNames.length - labels.length}).map(() => null),
);

const gauge = new client.Gauge({
    name: 'a_apks',
    help: 'a_apks-metrics',
    labelNames: ['type', 'ext', 'ext2', 'ext3', 'ext4'],

    async collect() {
        try {
            this.reset();

            const dataFile = await fs.readFile(cronConfig.json.file);
            const parsed = JSON.parse(dataFile);

            const {apk, errors, timestamp} = parsed;
            const providers = Object.keys(apk);
            const apps = Object.values(apk).flat();

            addLabels(this, 'timestamp', timestamp).set(1);
            addLabels(this, 'providers-count').set(providers.length);
            addLabels(this, 'apps-count').set(apps.length);

            apps.forEach(app => {
                addLabels(this, 'apps', app.label, app.pkg, app.version, app.date || '-').set(Number(app.size.value));
            });

            addLabels(this, 'errors-count').set(errors.length);

            errors.forEach(error => {
                addLabels(this, 'errors', error).set(1);
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
