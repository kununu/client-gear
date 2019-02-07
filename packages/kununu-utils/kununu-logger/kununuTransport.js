const TransportStream = require('winston-transport');
const {LEVEL, MESSAGE} = require('triple-beam');

import {formatNodeRequest} from './index';

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
    debug: 7
  };

  return levels[level.toLowerCase()];
}

module.exports = class kununu extends TransportStream {
  constructor(options = {}) {
    super(options);
  
    this.name = 'kununu-winston';
    this.triggerLevel = options.triggerLevel || 'error';

    this.state = [];
  }

  pushToState (log) {
    this.state.push(log);
  }

  log (info, callback) {
    setImmediate(() => this.emit('logged', info));
    
    const formatedLog = JSON.parse(formatNodeRequest(info));
    
    // Store all response logs on state
    this.pushToState(formatedLog);
    
    // If is below minimum log level, then recover previous logs
    if(this.isAboveMinimumLogLevel(info)) {
      const recoverLogs = this.recoverLogs(formatedLog);
      console.log(recoverLogs);
    }

    callback();
  }

  // Check whether request is below minimum log level
  isAboveMinimumLogLevel (info) {
    return getLoggingLevel(info[LEVEL]) <= getLoggingLevel(this.triggerLevel);
  }
  
  // Recover logs with same trace id as the error
  recoverLogs (info) {
    return this.state.filter(log => info.trace_id === log.trace_id);
  }
};
