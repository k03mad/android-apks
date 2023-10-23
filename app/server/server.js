import compression from 'compression';
import express from 'express';
import {engine} from 'express-handlebars';
import {rateLimit} from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import env from '../../env.js';
import {linkStyle} from '../../utils/colors.js';
import {getRoutePath} from '../../utils/express.js';
import {log} from '../../utils/logging.js';
import config from './config.js';
import routesIndex from './routes/_index.js';

const routes = Object.values(routesIndex);

/** */
export default () => {
    const app = express();

    env.debug && app.use(morgan('combined'));
    app.use(helmet());
    app.use(compression());
    app.use(express.static(config.static.root));

    app.engine(config.handlebars.ext, engine({extname: config.handlebars.ext}));
    app.set('view engine', config.handlebars.ext);
    app.set('views', config.handlebars.views);

    routes.forEach(route => {
        const path = getRoutePath(route);
        path && app.use(path, rateLimit(config.rates));

        app.use(route);
    });

    app.listen(env.server.port, () => log(
        Object.values(routes)
            .map(elem => getRoutePath(elem))
            .filter(elem => Boolean(elem) && elem !== '*')
            .map(elem => `route enabled: ${linkStyle(config.url + elem)}`),
    ));
};
