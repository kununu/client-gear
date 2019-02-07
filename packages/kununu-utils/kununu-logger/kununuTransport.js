const TransportStream = require('winston-transport');
const {LEVEL, MESSAGE} = require('triple-beam');
const Store = require('beedle');

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
  
    // Setup local state, may be overengineering
    const actions = {
      update(context, payload) {
        context.commit('update', payload);
      }
    };
    
    const mutations = {
      update(state, payload) {
        state = state.push(payload);
        return state;
      }
    };
    
    const initialState = [];

    this.storeInstance = new Store({
      actions,
      mutations,
      initialState
    });
  }

  log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    
    const parsedInfo = JSON.parse(formatNodeRequest(info));
    
    // Store all response logs on local store instance
    this.storeInstance.dispatch('update', parsedInfo);
    
    // If is below minimum log level, then recover previous logs
    if(this.isAboveMinimumLogLevel(info)) {
      const recoverLogs = this.recoverLogs(parsedInfo);
      console.log(recoverLogs);
    }

    callback();
  }

  isAboveMinimumLogLevel (info) {
    // Check whether request is below minimum log level
    return getLoggingLevel(info[LEVEL]) <= getLoggingLevel(this.triggerLevel);
  }
  
  recoverLogs (info) {
    const {state} = this.storeInstance;
    
    // Recover logs with same trace id as the error
    return state.filter(log => info.trace_id === log.trace_id);
  }
};
