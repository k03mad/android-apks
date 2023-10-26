import {logError} from '../../../../utils/logs.js';

/**
 * @param {Error} err
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
    logError(err.stack);
    res.sendStatus(500);
};
