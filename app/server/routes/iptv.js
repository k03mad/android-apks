import express from 'express';

const router = express.Router();

export default router.get(
    '/iptv', (req, res, next) => {
        try {
            res.redirect('https://raw.githubusercontent.com/blackbirdstudiorus/LoganetXIPTV/main/LoganetXAll.m3u');
        } catch (err) {
            next(err);
        }
    },
);
