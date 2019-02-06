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
    
    // Store all response logs on local store instance
    this.storeInstance.dispatch('update', JSON.parse(formatNodeRequest(info)));
    
    // If is above minimum log level, then recover previous logs
    if(this.isAboveMinimumLogLevel(info)) {
      this.recoverLogs();
    }

    callback();
  }
  
  isAboveMinimumLogLevel (info) {
    return this.triggerLevel === info[LEVEL];
  }
  
  recoverLogs () {
    const {state} = this.storeInstance;
    
    console.log(state);
  }
};
