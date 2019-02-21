import {createLogger, transports, format} from 'winston';

const {timestamp, printf} = format;
const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';

/**
 * Format request and response data
 * @param {object} info
 * @returns string stringified object
 */
export const formatNodeRequest = ({req, res, label, timeTakenMicros, level, message}) => JSON.stringify({
  message,
  level_name: typeof level === 'string' ? level.toUpperCase() : level,
  time: new Date().toISOString(),
  trace_id: req.headers['x-amzn-trace-id'] || '-',
  build: process.env.BUILD_NAME || '-',
  application: label,
  http: {
    method: req.method,
    uri: req.originalUrl,
    status: res.statusCode,
    remote_ip: (req.headers && req.headers['x-forwarded-for']) || (req.connection && req.connection.remoteAddress) || '-',
    local_ip: (req.connection && req.connection.localAddress) || '-',
    referer: (req.headers && req.headers.referer) || '-',
    user_agent: (req.headers && req.headers['user-agent']) || '-',
    remote_address: (req.connection && req.connection.remoteAddress) || '-',
  },
  channel: label,
  metrics: {
    time_taken_micros: timeTakenMicros,
  },
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
