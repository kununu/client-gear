const TransportStream = require('winston-transport');
const {LEVEL, MESSAGE} = require('triple-beam');
const Store = require('beedle');

import {formatNodeRequest} from './';

module.exports = class kununu extends TransportStream {
  constructor(options = {}) {
    super(options);
  
    this.name = 'kununu-winston';
    this.triggerLevel = options.triggerLevel || 'error';
  
    const actions = {
      updateLog(context, payload) {
        context.commit('setLog', payload);
      }
    };
    
    const mutations = {
      setLog(state, payload) {
        state = payload;
        return state;
      }
    };
    
    const initialState = {};

    this.storeInstance = new Store({
      actions,
      mutations,
      initialState
    });
  }

  log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    
    // Store all response logs on local store instance
    this.storeInstance.dispatch('updateLog', JSON.parse(formatNodeRequest(info)));
    
    // If is above minimum log level, then recover previous logs
    if(this.isAboveMinimumLogLevel(info)) {
      this.recoverPreviousLogs();
    }

    callback();
  }
  
  isAboveMinimumLogLevel (info) {
    return this.triggerLevel === info[LEVEL];
  }
  
  recoverPreviousLogs () {
    const {state} = this.storeInstance;
    
    console.log(state);
  }
};
