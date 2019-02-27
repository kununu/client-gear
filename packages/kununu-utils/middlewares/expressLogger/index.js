import {logger, logLevelName} from '../../kununu-logger';

/**
 * Middleware for Express that logs request pipeline
 * from when it comes until finished. It also logs
 * any aborts or internal errors.
 * @param {Object} req
 * @param {Object} res
 * @param {requestCallback} next
 */
const expressLogger = application => (req, res, next) => {
  const startDate = new Date();

  // Logs a request in with kununu-logger
  logger.info({
    req,
    application,
    channel: 'middleware',
    message: `Request In: ${req.method} ${req.originalUrl}`,
  });

  function log () {
    // Remove listeners to ensure that no hanging listeners exists
    res.removeListener('finish', log);
    res.removeListener('close', log);
    res.removeListener('error', log);

    // Define log level on
    const level = res.statusCode >= 400 ? (res.statusCode >= 500 ? logLevelName.CRITICAL : logLevelName.ERROR) : logLevelName.INFO;

    // Logs a request out using kununu-logger
    logger.log(this.level ? this.level : level, {
      req,
      res,
      application,
      metrics: {time_taken_micros: (new Date() - startDate) * 1000},
      channel: 'middleware',
      message: `Request Out: ${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl}`,
    });
  }

  // Logs successfully finished pipeline
  res.on('finish', log.bind({}));

  // Logs any aborted pipeline
  res.on('close', log.bind({level: 'error'}));

  // Logs any internal errors
  res.on('error', log.bind({level: 'error'}));

  next();
};

export default expressLogger;
