import {formatNodeRequest} from './index';

const TransportStream = require('winston-transport'); // eslint-disable-line import/no-extraneous-dependencies
const {LEVEL} = require('triple-beam'); // eslint-disable-line import/no-extraneous-dependencies

/**
 * Receives Winston logging level and
 * return its correspondent specified by RFC5424
 *
 * @param  {String} winstonLevel
 * @return {Integer}
 */
const getLoggingLevel = (level) => {
  const levels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
  };

  return levels[level.toLowerCase()];
};

module.exports = class kununuTransport extends TransportStream {
  constructor (options = {}) {
    super(options);

    this.name = 'kununu-winston';
    this.triggerLevel = options.triggerLevel || 'error';

    this.state = [];
  }

  pushState (log) {
    this.state.push(log);
  }

  removeState (traceId) {
    this.state = this.state.filter(log => traceId !== log.trace_id);
  }

  log (info, callback) {
    setImmediate(() => this.emit('logged', info));

    const formatedLog = JSON.parse(formatNodeRequest(info));

    // Store all response logs on state
    this.pushState(formatedLog);

    // If has required minimum log level, then recover previous logs
    if (this.hasRequiredMinimumLevel(info)) {
      const recoverLogs = this.recoverLogs(formatedLog);

      // Remove recovered logs from state
      this.removeState(formatedLog.trace_id);

      // Output recovered logs with same trace id
      console.log(recoverLogs); // eslint-disable-line no-console
    }

    callback();
  }

  // Check whether request has required minimum log level
  hasRequiredMinimumLevel (info) {
    return getLoggingLevel(info[LEVEL]) <= getLoggingLevel(this.triggerLevel);
  }

  // Recover logs with same trace id as the error
  recoverLogs (info) {
    return this.state.filter(log => info.trace_id === log.trace_id);
  }
};
