import {createLogger, transports, format} from 'winston';
import {uuidv4} from 'uuid/v4';

const {timestamp, printf} = format;
const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';

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
  trace_id: req.headers['x-amzn-trace-id'] || uuidv4(),
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
    return `${prefix}${JSON.stringify({...info, logType: 'custom_logger'})}`;
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
      level: minimumLogLevel
    }),
  ],
});
