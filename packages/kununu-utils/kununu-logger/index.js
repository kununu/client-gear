import {createLogger, transports, format} from 'winston';

const stringify = require('json-stringify-safe');

const {timestamp, printf} = format;
const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';

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

export const customFormat = printf((info) => formatNodeRequest(info));

export const logger = createLogger({
  format: format.combine(
    timestamp(),
    customFormat,
  ),
  transports: [
    new (transports.Console)({
      name: 'console',
      colorize: true,
      showLevel: true,
      level: minimumLogLevel,
    }),
  ],
});
