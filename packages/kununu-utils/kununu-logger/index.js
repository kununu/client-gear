import {createLogger, transports, format} from 'winston';

const {timestamp, printf} = format;
const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';

/**
 * Format request and response data
 * @param {object} info
 * @returns string stringified object
 */
export const formatNodeRequest = ({req, res, label, timeTakenMicros, level, message, exception}) => JSON.stringify({
  message,
  level_name: typeof level === 'string' ? level.toUpperCase() : level,
  time: new Date().toISOString(),
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
  channel: 'middleware_logger',
  metrics: {
    time_taken_micros: timeTakenMicros,
  },
  context: {
    exception,
  },
});

/**
 * Check if it's a custom log or the
 * standard request log. This is set based
 * on the custom param.
 */
export const customFormat = printf((info) => {
  const loggerType = info.custom ? 'custom_logger' : 'middleware_logger';
  const colorizedMessage = getColorizedMessage(`[${info.label}][${info.timestamp}][${info.level}][${loggerType}]`);

  // Logs in production should be outputted in JSON and not text
  const prefix = (process.env.NODE_ENV === 'production') ? '' : `${colorizedMessage}`;

  if (info.custom) {
    return `${prefix}${JSON.stringify(
      {
        message: info.message,
        level_name: typeof info.level === 'string' ? info.level.toUpperCase() : info.level,
        time: new Date().toISOString(),
        build: process.env.BUILD_NAME || '-',
        application: info.label,
        channel: loggerType,
        context: {
          exception: info.exception,
        },
      },
    )}`;
  }

  return `${prefix}${formatNodeRequest(info)}`;
});

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
