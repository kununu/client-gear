import {createLogger, format} from 'winston';

import FingersCrossed from './fingersCrossed';

const stringify = require('json-stringify-safe');

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
 * @param {object} info
 * @returns string stringified object
 */
export const formatNodeRequest = (info) => {
  const {
    req = {},
    res = {},
    label,
    timeTakenMicros,
    level,
    message,
    exception,
    custom,
  } = info;

  const date = new Date().toISOString();
  const channel = custom ? 'custom_logger' : 'middleware_logger';
  const colorizedMessage = getColorizedMessage(`[${label}][${date}][${level}][${channel}]`);

  const prefix = (process.env.NODE_ENV === 'production') ? '' : `${colorizedMessage}`;

  return `${prefix}${stringify({
    message,
    level_name: typeof level === 'string' ? level.toUpperCase() : level,
    time: date,
    trace_id: (req.headers && req.headers['x-amzn-trace-id']) || '-',
    build: process.env.BUILD_NAME || '-',
    application: label,
    http: {
      method: req.method,
      uri: req.originalUrl,
      status: res.statusCode,
      remote_ip: (req.headers && req.headers['x-forwarded-for']) || '-',
      local_ip: (req.connection && req.connection.localAddress) || '-',
      referer: (req.headers && req.headers.referer) || '-',
      user_agent: (req.headers && req.headers['user-agent']) || '-',
    },
    channel,
    metrics: {
      time_taken_micros: timeTakenMicros,
    },
    context: {
      exception,
    },
  })}`;
};

export const customFormat = printf(info => formatNodeRequest(info));

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
