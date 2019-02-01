import {logger} from '../../kununu-logger';

/**
 * This middleware will log
 * the entire request pipeline from
 * the initial request to after it
 * has finished and also log any aborts
 * or internal errors.
 */
const expressLogger = label => (req, res, next) => {
  // log initial incoming request
  const startDate = new Date();

  // log request in before processing
  logger.log('info', {
    custom: true,
    method: req.method,
    request: req.originalUrl,
    label,
  });

  // Log request using kununu-logger
  function log () {
    // ensure that no hanging listeners exist
    // regardless of which path is taken
    // to prevent, nothing will prevent garbage
    // collection
    res.removeListener('finish', log);
    res.removeListener('close', log);
    res.removeListener('error', log);

    const status = res.statusCode < 400 ? 'info' : 'error';

    logger.log(status, {req, res, label, timeTakenMicros: (new Date() - startDate) * 1000});
  }

  // logs any successfully finished pipeline
  res.once('finish', log.bind());
  // logs any aborted pipeline
  res.once('close', log.bind());
  // logs any internal errors
  res.once('error', log.bind());

  next();
};

export default expressLogger;
