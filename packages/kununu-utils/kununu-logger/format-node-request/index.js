import {loggingLevels} from '../config';

const stringify = require('json-stringify-safe');

const getColorizedMessage = message => `\x1b[32m${message}\x1b[0m`;

/**
 * Receives an info object and returns
 * Returns a formatted request and response ready to be logged
 * @param {Object} info
 * @returns {string} Stringified object
 */
const formatNodeRequest = ({
  application,
  channel = 'app',
  context,
  level,
  message,
  metrics,
  req = {},
  res = {},
}) => {
  const datetime = new Date().toISOString();
  const colorizedMessage = getColorizedMessage(`[${application}][${datetime}][${level}][${channel}]`);
  const prefix = (process.env.NODE_ENV === 'production') ? '' : `${colorizedMessage}`;

  const nodeRequest = {
    message,
    level: typeof level === 'string' && loggingLevels[level.toLowerCase()],
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

export default formatNodeRequest;
