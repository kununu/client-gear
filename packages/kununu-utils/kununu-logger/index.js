import {createLogger, transports, format} from 'winston';

const {timestamp, printf} = format;
const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

/**
 * Format request and response data
 * @param  object containing res and req
 * @return string stringified object
 */
export const formatNodeRequest = ({req, res, label}) => JSON.stringify({
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
});

/**
 * Check if it's a custom log or the
 * standard request log. This is set based
 * on the custom param.
 */
export const customFormat = printf((info) => {
  const prefix = getColorizedMessage(`[${info.label}][${info.timestamp}][${info.level}]`);

  if (info.custom) {
    return `${prefix} – custom logger - ${JSON.stringify(info)}`;
  }

  return `${prefix} – middleware logger - ${formatNodeRequest(info)}`;
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
    }),
  ],
});
