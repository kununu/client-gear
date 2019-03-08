import formatNodeRequest from '../format-node-request';

const TransportStream = require('winston-transport');

module.exports = class FingersCrossed extends TransportStream {
  constructor (options = {}) {
    super(options);

    this.name = options.name || 'fingers-crossed';
    this.level = options.level || 'info';
    this.activationLogLevel = options.activationLogLevel || 'error';
    this.levels = options.levels;

    this.state = [];
  }

  log (info, callback) {
    setImmediate(() => this.emit('logged', info));

    const log = formatNodeRequest(info);
    const logLevel = info.level;

    if (info.req) {
      const traceId = info.req.headers['x-amzn-trace-id'];

      if (traceId) {
        this.statePush(traceId, log);

        if (this.hasActivationLogLevel(logLevel)) {
          const logs = this.recoverLogs(traceId);

          this.cleanState(traceId);
          this.outputLog(logs);
        }
      }

      if (!traceId && this.hasMinimumLogLevel(logLevel)) {
        this.outputLog(log);
      }
    }

    if (!info.req && this.hasMinimumLogLevel(logLevel)) {
      this.outputLog(log);
    }

    callback();
  }

  /**
   * Receives Winston logging level and
   * return its correspondent specified by RFC5424
   *
   * @param  {String} level
   * @return {Integer}
   */
  getLogLevel = (level = this.level) => this.levels[level.toLowerCase()];

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
  hasMinimumLogLevel = level => this.getLogLevel(level) <= this.getLogLevel(this.level);

  /**
   * Push log to state
   *
   * @param {String} traceId
   * @param {Object} log
   */
  statePush = (traceId, log) => this.state.push({trace_id: traceId, formatted_log: log});

  /**
   * Remove logs with a certain trace ID from state
   *
   * @param {String} traceId
   */
  cleanState = (traceId) => {
    this.state = this.state.filter(log => traceId !== log.trace_id);
  }

  /**
   * Recover logs with same trace ID as the error
   *
   * @param  {String} traceId
   * @return {Array}
   */
  recoverLogs = traceId => this.state.filter(log => traceId === log.trace_id);

  /**
   * Output an array of logs individually or just one if it's an Object
   *
   * @param {(Array|Object)} logs
   */
  outputLog = (logs) => {
    if (Array.isArray(logs)) {
      logs.forEach(log => console.log(log)); // eslint-disable-line no-console
    } else {
      console.log(logs); // eslint-disable-line no-console
    }
  };
};
