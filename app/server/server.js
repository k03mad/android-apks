import {engine} from 'express-handlebars';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import minify from 'express-minify';
import morgan from 'morgan';

import {linkStyle} from '../../utils/colors.js';
import {log} from '../../utils/logs.js';
import env from '../../env.js';

import config from './config.js';
import routesIndex from './routes/_index.js';

const routes = Object.values(routesIndex);
const getRoutePath = route => route.stack?.[0]?.route?.path;

/** */
export default () => {
    const app = express();

    env.debug && app.use(morgan('combined'));
    app.use(helmet());
    app.use(compression());
    app.use(minify());

    app.use(express.static(config.static.root));

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
