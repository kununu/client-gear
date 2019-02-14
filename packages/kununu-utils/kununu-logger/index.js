import {createLogger, format} from 'winston';

import FingersCrossed from './fingersCrossed';

const {timestamp, printf} = format;
const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

// It won't be logged when below this level
const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';
// Logs below this level won't be immediately outputted, but when this is reached
const activationLogLevel = process.env.ACTIVATION_LOG_LEVEL || 'error';

// Custom logging levels
export const loggingLevels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

/**
 * Format request and response data
 * @param  object containing res and req
 * @return string stringified object
 */
export const formatNodeRequest = ({req, res, label, timeTakenMicros}) => JSON.stringify({
  label,
  time: new Date().toISOString(),
  method: req.method,
  request: req.originalUrl,
  status: res.statusCode,
  remote_ip: req.connection.remoteAddress || '-',
  referer: req.headers.referer || '-',
  forwarded_for: req.headers['x-forwarded-for'] || '-',
  trace_id: req.headers['x-amzn-trace-id'] || '-',
  logType: 'middleware_logger',
  user_agent: req.headers['user-agent'] || '-',
  time_taken_micros: timeTakenMicros,
  build: process.env.BUILD_NAME || '-',
});

/**
 * Check if it's a custom log or the
 * standard request log. This is set based
 * on the custom param.
 */
export const customFormat = printf((info) => {
  const colorizedMessage = getColorizedMessage(`[${info.label}][${info.timestamp}][${info.level}]`);
  const loggerType = info.custom ? '– custom logger -' : ' – middleware logger - ';
  const kibanaFormatting = process.env.NODE_ENV === 'production';

  // Kibana only supports JSON and not text so the prefix only added
  // on non kibana formatting
  const prefix = kibanaFormatting ? '' : `${colorizedMessage}${loggerType}`;

  if (info.custom) {
    return `${prefix}${JSON.stringify({...info, logType: 'custom_logger', build: process.env.BUILD_NAME || '-'})}`;
  }

  return `${prefix}${formatNodeRequest(info)}`;
});

export const logger = createLogger({
  levels: loggingLevels,
  format: format.combine(
    timestamp(),
    customFormat,
  ),
  transports: [
    new (FingersCrossed)({
      level: 'debug',
      minimumLogLevel,
      activationLogLevel,
    }),
  ],
});
