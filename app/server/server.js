import compression from 'compression';
import express from 'express';
import {create} from 'express-handlebars';
import minify from 'express-minify';
import handlebars from 'handlebars';
import handlebarsHelpersMinify from 'handlebars-helper-minify';
import handlebarsHelpers from 'handlebars-helpers';
import helmet from 'helmet';
import morgan from 'morgan';

import env from '../../env.js';
import {linkStyle} from '../../utils/colors.js';
import {log} from '../../utils/logs.js';
import config from './config.js';
import routesIndex from './routes/_index.js';

handlebarsHelpers();
handlebarsHelpersMinify.register(handlebars, {});

const hbs = create({extname: config.handlebars.ext, handlebars});
const routes = Object.values(routesIndex);
const getRoutePath = route => route.stack?.[0].route.path;

/** */
export default () => {
    const app = express();

    env.debug && app.use(morgan('combined'));
    app.use(helmet());
    app.use(compression());
    app.use(minify());
    app.use(express.static(config.static.root));

    app.engine(config.handlebars.ext, hbs.engine);
    app.set('view engine', config.handlebars.ext);
    app.set('views', config.handlebars.views);

    routes.forEach(route => app.use(route));

    app.listen(env.server.port, () => log(
        Object.values(routes)
            .map(elem => getRoutePath(elem))
            .filter(elem => Boolean(elem) && elem !== '*')
            .map(elem => `route enabled: ${linkStyle(config.url + elem)}`),
    ));
};
