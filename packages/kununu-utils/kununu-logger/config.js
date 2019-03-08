/**
 * Minimum level is in use by both Console and Fingers Crossed transports
 * Logs below this level are always discarded
 */
export const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';

/**
 * Activation level is used by Fingers Crossed transport
 * Logs below are only output when this is reached
 */
export const activationLogLevel = process.env.ACTIVATION_LOG_LEVEL || 'error';

/**
 * Custom logging levels
 * This defines new logger method calls, e.g.: logger.emergency() and logger.critical()
 */
export const loggingLevels = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};
