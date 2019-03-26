import {createLogger, format, transports as winston} from 'winston';

import {minimumLogLevel, activationLogLevel, loggingLevels} from './config';
import formatNodeRequest from './format-node-request';
import FingersCrossed from './fingers-crossed';

const {timestamp, printf} = format;

export const customFormat = printf(info => formatNodeRequest(info));

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

export const logger = createLogger({
  levels: loggingLevels,
  format: format.combine(
    timestamp(),
    customFormat,
  ),
  transports,
});
