import {requestLogger} from '../../kununu-logger';

const CRITICAL = 'critical';
const ERROR = 'error';
const INFO = 'info';

/**
 * Middleware for Express that logs request pipeline
 * from when it comes until finished. It also logs
 * any aborts or internal errors.
 * @param {Object} req
 * @param {Object} res
 * @param {requestCallback} next
 */
const expressLogger = (application, ignoredRoutes = []) => (req, res, next) => {
  const startDate = new Date();

  function log () {
    // Remove listeners to ensure that no hanging listeners exists
    res.removeListener('finish', log);
    res.removeListener('close', log);
    res.removeListener('error', log);

    // Define log level on
    const level = res.statusCode >= 400 ? (res.statusCode >= 500 ? CRITICAL : ERROR) : INFO; // eslint-disable-line no-nested-ternary

    if (ignoredRoutes.includes(req.originalUrl)) return;

    // Logs a request out using kununu-logger
    requestLogger.log(this.level ? this.level : level, {
      req,
      res,
      application,
      metrics: {time_taken_micros: (new Date() - startDate) * 1000},
      channel: 'middleware',
      message: `Request Out: ${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl} - origin ${this.origin}`,
    });
  }

  // Logs successfully finished pipeline
  res.on('finish', log.bind({origin: 'finish'}));

  // Logs any aborted pipeline
  res.on('close', log.bind({level: 'error', origin: 'close'}));

  // Logs any internal errors
  res.on('error', log.bind({level: 'error', origin: 'error'}));

  next();
};

export default expressLogger;
