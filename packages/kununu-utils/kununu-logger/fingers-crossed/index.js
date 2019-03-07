import {formatNodeRequest, loggingLevels} from '../index';

const TransportStream = require('winston-transport'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = class FingersCrossed extends TransportStream {
  constructor (options = {}) {
    super(options);

    this.name = options.name || 'fingers-crossed';
    this.minimumLogLevel = options.minimumLogLevel || 'info';
    this.activationLogLevel = options.activationLogLevel || 'error';

    this.state = [];
  }

  log (info, callback) {
    setImmediate(() => this.emit('logged', info));

    const log = this.formatRequest(info);
    const logLevel = info.level;

    if (info.req) {
      const amznTraceId = info.req.headers['x-amzn-trace-id'];

      if (amznTraceId) {
        this.pushToState(log);

        if (this.hasActivationLogLevel(logLevel)) {
          const logs = this.recoverLogsFromState(log);

          this.removeFromState(log.trace_id);
          this.outputLog(logs);
        }
      }

      if (!amznTraceId && this.hasMinimumLogLevel(logLevel)) {
        this.outputLog(log);
      }
    }

    if (!info.req && this.hasMinimumLogLevel(logLevel)) {
      this.outputLog(log);
    }

    callback();
  }

  /**
   * Format request before save to state.
   * formatNodeRequest will stringify, so we need to parse it
   *
   * @param  {Object} info
   * @return {Object}
   */
  formatRequest = info => JSON.parse(formatNodeRequest(info));

  /**
   * Receives Winston logging level and
   * return its correspondent specified by RFC5424
   *
   * @param  {String} level
   * @return {Integer}
   */
  getLogLevel = (level = this.minimumLogLevel) => loggingLevels[level.toLowerCase()];

  /**
   * Check whether request has reached activation log level
   *
   * @param  {level} String
   * @return {Boolean}
   */
  hasActivationLogLevel = level => this.getLogLevel(level) <= this.getLogLevel(this.activationLogLevel);

  /**
   * Check whether request has reached minimum log level
   *
   * @param  {level} String
   * @return {Boolean}
   */
  hasMinimumLogLevel = level => this.getLogLevel(level) <= this.getLogLevel(this.minimumLogLevel);

  /**
   * Push a given log to state
   *
   * @param {Object} log
   */
  pushToState = log => this.state.push(log);

  /**
   * Remove logs with a given trace ID from state
   *
   * @param {String} traceId
   */
  removeFromState = (traceId) => {
    this.state = this.state.filter(log => traceId !== log.trace_id);
  }

  /**
   * Recover logs with same trace ID as the error
   *
   * @param  {Object} info
   * @return {Array}
   */
  recoverLogsFromState = info => this.state.filter(log => info.trace_id === log.trace_id);

  /**
   * Output a given Array of logs individually or just one if it's an Object
   *
   * @param {(Array|Object)} logs
   */
  outputLog = (logs) => {
    if (Array.isArray(logs)) {
      logs.forEach(log => console.log(JSON.stringify(log))); // eslint-disable-line no-console
    } else {
      console.log(JSON.stringify(logs)); // eslint-disable-line no-console
    }
  };
};
