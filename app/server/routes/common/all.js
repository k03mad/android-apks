import express from 'express';

const router = express.Router();

export default router.get(
    // not send anything => connectionfailure at browser
    // eslint-disable-next-line no-empty-function
    '*', () => {},
);
