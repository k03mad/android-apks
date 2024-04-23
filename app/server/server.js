import {log} from '@k03mad/simple-log';
import compression from 'compression';
import express from 'express';
import {engine} from 'express-handlebars';
import minify from 'express-minify';
import helmet from 'helmet';
import morgan from 'morgan';

import env from '../../env.js';
import {linkStyle} from '../../utils/colors.js';

import config from './config.js';
import routesIndex from './routes/_index.js';

const routes = Object.values(routesIndex);
const getRoutePath = route => route.stack?.[0]?.route?.path;

/** */
export default () => {
    const app = express();

    env.debug && app.use(morgan('combined'));
    app.use(express.static(config.static.root));

    app.use(helmet());
    app.use(compression());
    app.use(minify());

    app.engine(config.handlebars.ext, engine({extname: config.handlebars.ext}));
    app.set('view engine', config.handlebars.ext);
    app.set('views', config.handlebars.views);

    routes.forEach(route => app.use(route));

    app.listen(env.server.port, () => log(
        Object.values(routes)
            .map(elem => getRoutePath(elem))
            .filter(elem => Boolean(elem) && elem !== '*')
            .map(elem => `route enabled: ${linkStyle(config.url.local + elem)}`),
    ));
};
