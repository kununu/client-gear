import {createLogger, transports, format} from 'winston';

const stringify = require('json-stringify-safe');

const {timestamp, printf} = format;
const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';

export const logLevelNum = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

/**
 * Returns a formatted request and response ready to be logged
 * @param {Object} info
 * @returns {string} Stringified object
 */
export const formatNodeRequest = ({
  req = {},
  res = {},
  application,
  metrics,
  level,
  message,
  context,
  channel = 'app',
}) => {
  const datetime = new Date().toISOString();
  const colorizedMessage = getColorizedMessage(`[${application}][${datetime}][${level}][${channel}]`);
  const prefix = (process.env.NODE_ENV === 'production') ? '' : `${colorizedMessage}`;

  const nodeRequest = {
    message,
    level: typeof level === 'string' && logLevelNum[level.toLowerCase()],
    level_name: typeof level === 'string' ? level.toUpperCase() : level,
    datetime,
    trace_id: (req.headers && req.headers['x-amzn-trace-id']),
    build: process.env.BUILD_NAME,
    application,
    channel,
    metrics,
    context,
  };

  // Add http object when req or res have entries
  if (Object.entries(req).length > 0 || Object.entries(res).length > 0) {
    nodeRequest.http = {
      method: req.method,
      uri: req.originalUrl,
      status: res.statusCode,
      remote_ip: (req.headers && req.headers['x-forwarded-for']),
      local_ip: (req.connection && req.connection.localAddress),
      referer: (req.headers && req.headers.referer),
      user_agent: (req.headers && req.headers['user-agent']),
    };
  }

  return `${prefix}${stringify(nodeRequest)}`;
};

export const customFormat = printf(info => formatNodeRequest(info));

export const logger = createLogger({
  levels: logLevelNum,
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
