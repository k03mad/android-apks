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

const addLabels = (ctx, ...labels) => ctx.labels(
    ...labels,
    ...Array.from({length: labelNames.length - labels.length}).map(() => null),
);

const gauge = new client.Gauge({
    name: 'aapks',
    help: 'aapks',
    labelNames: ['type', 'ext', 'ext2', 'ext3', 'ext4'],

    async collect() {
        try {
            this.reset();

            const dataFile = await fs.readFile(cronConfig.json.file);
            const parsed = JSON.parse(dataFile);

            const {apk, errors, timestamp} = parsed;
            const providers = Object.keys(apk);
            const apps = Object.values(apk).flat();

            addLabels(this, 'apks-count').set(apps.length);
            addLabels(this, 'errors-count').set(errors.length);
            addLabels(this, 'providers-count').set(providers.length);
            addLabels(this, 'timestamp-duration').set(timestamp.duration);
            addLabels(this, 'timestamp-pretty', timestamp.pretty).set(1);

            apps.forEach(app => {
                addLabels(this, 'apks-size', app.label).set(app.size.raw);
                addLabels(this, 'apks-full', app.label, app.pkg, app.version, app.date || '-').set(app.size.raw);
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
            res.send(metrics);
        } catch (err) {
            next(err);
        }
    },
);
