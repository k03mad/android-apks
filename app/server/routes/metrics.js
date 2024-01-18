import {registerMetrics} from '@k03mad/simple-prom';
import express from 'express';

import env from '../../../env.js';
import {packageJson} from '../../../utils/meta.js';
import {getPageData} from '../helpers/page.js';

const router = express.Router();

const labelNames = ['type', 'ext', 'ext2', 'ext3', 'ext4'];

const addLabels = (ctx, ...labels) => ctx.labels(
    ...labels,
    ...Array.from({length: labelNames.length - labels.length}, () => null),
);

const register = registerMetrics({
    appName: packageJson.name,
    port: env.server.port,

    metrics: {
        aapks: {
            name: 'aapks',
            help: 'aapks',
            labelNames,

            async collect(ctx) {
                ctx.reset();

                const data = await getPageData();

                const {apk, errors, timestamp, ua} = data;
                const providers = Object.keys(apk);
                const apps = Object.values(apk).flat();

                addLabels(ctx, 'apks-count').set(apps.length);
                addLabels(ctx, 'errors-count').set(errors.length);
                addLabels(ctx, 'ua-count').set(ua.length);
                addLabels(ctx, 'providers-count').set(providers.length);
                addLabels(ctx, 'timestamp-duration').set(timestamp.duration);
                addLabels(ctx, 'timestamp-pretty', timestamp.pretty).set(1);

                ua.forEach((useragent, i) => {
                    addLabels(ctx, 'ua-string', useragent).set(i + 1);
                });

                errors.forEach((err, i) => {
                    addLabels(ctx, 'errors-string', err).set(i + 1);
                });

                apps.forEach(app => {
                    addLabels(ctx, 'apks-size', app.label).set(app.size.raw);
                    addLabels(ctx, 'apks-duration', app.label).set(app.download.duration);
                    addLabels(ctx, 'apks-full', app.label, app.pkg, app.version, app.date || '-').set(1);
                });
            },
        },
    },
});

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
