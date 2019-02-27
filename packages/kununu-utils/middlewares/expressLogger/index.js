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

  // Log request using kununu-logger
  function log () {
    // ensure that no hanging listeners exist
    // regardless of which path is taken
    // to prevent, nothing will prevent garbage
    // collection
    res.removeListener('finish', log);
    res.removeListener('close', log);
    res.removeListener('error', log);

    logger.log(this.status, {
      req, res, label, timeTakenMicros: (new Date() - startDate) * 1000, custom: false,
    });
  }

  // logs any successfully finished pipeline
  res.on('finish', log.bind({status: 'info'}));
  // logs any aborted pipeline
  res.on('close', log.bind({status: 'error'}));
  // logs any internal errors
  res.on('error', log.bind({status: 'error'}));


  next();
};

export default expressLogger;
