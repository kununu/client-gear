/**
 * Minimum level is used by Console and Fingers Crossed transports
 * When minimum log level is set, any log that has
 * inferior level will be discarded and not processed by transport
 *
 */
export const minimumLogLevel = process.env.MINIMUM_LOG_LEVEL || 'info';

/**
 * Request minimum level is defined separately because is only used by
 * request logger, which receives log calls from Express middleware only
 */
export const requestMinimumLogLevel = process.env.REQUEST_MINIMUM_LOG_LEVEL || 'info';

/**
 * Activation level is used by Fingers Crossed transport
 * When activation log level is set, any log that has
 * equal or superior level will be outputed
 *
 */
export const activationLogLevel = process.env.ACTIVATION_LOG_LEVEL || 'error';

/**
 * Custom logging levels
 * This defines new logger method calls, e.g.: logger.emergency() and logger.critical()
 *
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
