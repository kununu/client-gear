import {formatNodeRequest, customFormat} from './index';

const TransportStream = require('winston-transport'); // eslint-disable-line import/no-extraneous-dependencies
const {LEVEL} = require('triple-beam'); // eslint-disable-line import/no-extraneous-dependencies

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

module.exports = class FingersCrossed extends TransportStream {
  constructor (options = {}) {
    super(options);

    this.name = options.name || 'fingers-crossed';
    this.level = options.level;
    this.activationLevel = options.activationLevel || 'error';

    this.state = [];
  }

  log (info, callback) {
    setImmediate(() => this.emit('logged', info));

    if (info.req && info.req.headers['x-amzn-trace-id']) {
      // Logs should be JSON parsed in order to be searchable when on state
      const formatedLog = this.formatRequest(info);

      // Store all response logs on state
      this.pushToState(formatedLog);

      // If has reached activation log level, then recover previous logs
      if (this.hasReachedActivationLevel(info)) {
        const logs = this.recoverLogsFromState(formatedLog);

        // Remove recovered logs from state
        this.removeFromState(formatedLog.trace_id);

        // Output recovered logs with same trace ID
        this.outputLogs(logs); // eslint-disable-line no-console
      }
    } else {
      // Output log without trace ID immediately if it has reached activation log level
      if (this.hasReachedActivationLevel(info)) {
        console.log(customFormat(info)); // eslint-disable-line no-console
      }
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
  formatRequest = (info) => JSON.parse(formatNodeRequest(info));

  /**
   * Receives Winston logging level and
   * return its correspondent specified by RFC5424
   *
   * @param  {String} level
   * @return {Integer}
   */
  getLogLevel = (level = this.level) => levels[level.toLowerCase()];

  /**
   * Check whether request has reached activation log level
   *
   * @param  {Object} info
   * @return {Boolean}
   */
  hasReachedActivationLevel = (info) => this.getLogLevel(info[LEVEL]) <= this.getLogLevel(this.activationLevel);

  /**
   * Push a given log to state
   *
   * @param {Object} log
   */
  pushToState = (log) => this.state.push(log);

  /**
   * Remove logs with a given trace ID from state
   *
   * @param {String} traceId
   */
  removeFromState = (traceId) => this.state = this.state.filter(log => traceId !== log.trace_id);

  /**
   * Recover logs with same trace ID as the error
   *
   * @param  {Object} info
   * @return {Array}
   */
  recoverLogsFromState = (info) => this.state.filter(log => info.trace_id === log.trace_id);

  /**
   * Output logs individually
   *
   * @param {Array} logs
   */
  outputLogs = (logs) => logs.forEach(log => console.log(JSON.stringify(log)));
};
