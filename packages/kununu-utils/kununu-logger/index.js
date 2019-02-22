import {createLogger, transports, format} from 'winston';

const {timestamp, printf} = format;
const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';

/**
 * Format request and response data
 * @param {object} info
 * @returns string stringified object
 */
export const formatNodeRequest = (info) => {
  const {req, res, label, timeTakenMicros, level, message, exception, custom} = info;

  const channel = custom ? 'custom_logger' : 'middleware_logger';
  const colorizedMessage = getColorizedMessage(`[${label}][${timestamp}][${level}][${channel}]`);

  const prefix = (process.env.NODE_ENV === 'production') ? '' : `${colorizedMessage}`;

  return `${prefix}${JSON.stringify({
    message,
    level_name: typeof level === 'string' ? level.toUpperCase() : level,
    time: new Date().toISOString(),
    trace_id: (req.headers && req.headers['x-amzn-trace-id']) || '-',
    build: process.env.BUILD_NAME || '-',
    application: label,
    http: {
      method: req && req.method,
      uri: req && req.originalUrl,
      status: req && res.statusCode,
      remote_ip: (req && req.headers && req.headers['x-forwarded-for']) || '-',
      local_ip: (req && req.connection && req.connection.localAddress) || '-',
      referer: (req && req.headers && req.headers.referer) || '-',
      user_agent: (req && req.headers && req.headers['user-agent']) || '-',
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

export const logger = createLogger({
  format: format.combine(
    timestamp(),
    formatNodeRequest,
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
