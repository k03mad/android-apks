import express from 'express';

import {getPageData} from '../helpers/page.js';

const router = new express.Router();

export default router.get(
    '/apps', async (req, res, next) => {
        try {
            const data = await getPageData(req);
            res.render('apps', data);
        } catch (err) {
            next(err);
        }
    },
);
