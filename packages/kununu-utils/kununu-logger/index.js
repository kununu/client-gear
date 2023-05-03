import {loggers, format, transports} from 'winston';

import formatNodeRequest from './format-node-request';
import {
  minimumLogLevel,
  requestMinimumLogLevel,
  loggingLevels,
} from './config';

const {timestamp, printf} = format;

export const customFormat = printf(info => formatNodeRequest(info));

const getTransportByEnv = () => ({
  transports: [
    new transports.Console({
      name: 'console',
      colorize: true,
      showLevel: true,
      level: minimumLogLevel,
    }),
  ],
});
const options = {
  levels: loggingLevels,
  format: format.combine(
    timestamp(),
    customFormat,
  ),
};

/**
 * Default logger that is used by all logger calls
 */
loggers.add('default', {
  ...options,
  ...getTransportByEnv(),
});

/**
 * Separated logger that is used by request in and out logger calls only
 * Uses only Console transport in production or development environment
 */
loggers.add('request', {
  ...options,
  transports: [
    new transports.Console({
      name: 'console',
      colorize: true,
      showLevel: true,
      level: requestMinimumLogLevel,
    }),
  ],
});

export const logger = loggers.get('default');
export const requestLogger = loggers.get('request');
