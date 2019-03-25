import formatNodeRequest from '../format-node-request';

const TransportStream = require('winston-transport');
const NodeCache = require('node-cache');

module.exports = class FingersCrossed extends TransportStream {
  constructor (options = {}) {
    super(options);

    this.name = options.name || 'fingers-crossed';
    this.level = options.level || 'info';
    this.activationLogLevel = options.activationLogLevel || 'error';
    this.levels = options.levels;

    // Logs expiration is set to 10 minutes
    this.cache = new NodeCache({stdTTL: 600, checkperiod: 600});
  }

  log (info, callback) {
    setImmediate(() => this.emit('logged', info));

    const log = formatNodeRequest(info);
    const logLevel = info.level;

    if (info.req) {
      const traceId = info.req.headers['x-amzn-trace-id'];

      if (traceId) {
        this.saveOnState(traceId, log);

        // Outputs when it has a request, trace ID and reaches activation log level
        if (this.hasActivationLogLevel(logLevel)) {
          const logs = this.recoverLogs(traceId);

          this.removeFromState(traceId);
          this.outputLog(logs);
        }
      }

      // Outputs when it has a request, but not a trace ID and has minimum log level
      if (!traceId && this.hasMinimumLogLevel(logLevel)) {
        this.outputLog(log);
      }
    }

    // Outputs when it's not a request but has minimum log level
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
   * Save log on state
   *
   * @param {String} traceId
   * @param {Object} raw
   */
  saveOnState = (traceId, raw) => {
    let log = this.cache.get(traceId) || [];
    this.cache.set(traceId, [...log, raw]);
  }

  /**
   * Remove logs with a certain trace ID from state
   *
   * @param {String} traceId
   */
  removeFromState = traceId => this.cache.del(traceId);

  /**
   * Recover logs with same trace ID as the error
   *
   * @param  {String} traceId
   * @return {Array}
   */
  recoverLogs = traceId => this.cache.get(traceId, (err, logs) => !err && Array.isArray(logs) ? logs : []);

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
