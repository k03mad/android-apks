import {logPlainError} from '../../../../utils/logging.js';

/**
 * @param {Error} err
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
    logPlainError(['api', err.stack]);
    res.sendStatus(500);
};
