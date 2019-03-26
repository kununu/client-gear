import {loggers, format, transports as winston} from 'winston';

import {minimumLogLevel, requestMinimumLogLevel, activationLogLevel, loggingLevels} from './config';
import formatNodeRequest from './format-node-request';
import FingersCrossed from './fingers-crossed';

const {timestamp, printf} = format;

export const customFormat = printf(info => formatNodeRequest(info));

const getTransport = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      transports: [
        new FingersCrossed({
          level: minimumLogLevel,
          activationLogLevel,
          levels: loggingLevels,
        }),
      ],
    }
  }

  return {
    transports: [
      new winston.Console({
        name: 'console',
        colorize: true,
        showLevel: true,
        level: minimumLogLevel,
      }),
    ],
  }
};

const options = {
  levels: logLevelNum,
  format: format.combine(
    timestamp(),
    customFormat,
  ),
};

const transports = [];

if (process.env.NODE_ENV === 'production') {
  transports.push(new FingersCrossed({
    level: minimumLogLevel,
    activationLogLevel,
    levels: loggingLevels,
  }));
} else {
  transports.push(new winston.Console({
    name: 'console',
    colorize: true,
    showLevel: true,
    level: minimumLogLevel,
  }));
}

/**
 * Default logger that is used by all logger calls
 */
loggers.add('default', {
  ...options,
  transports,
});

/**
 * Separated logger that is used by request in and out logger calls only
 * Uses only Console transport in production or development environment
 */
loggers.add('request', {
  ...options,
  transports: [
    new (transports.Console)({
      name: 'console',
      colorize: true,
      showLevel: true,
      level: requestMinimumLogLevel,
    }),
  ],
});

export const logger = loggers.get('default');
export const requestLogger = loggers.get('request');
