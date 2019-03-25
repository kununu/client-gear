import {advanceTo, clear} from 'jest-date-mock'; // eslint-disable-line import/no-extraneous-dependencies

import {
  formatNodeRequest,
  logger,
  requestLogger,
  customFormat,
} from './index';

const express = require('express');
const request = require('supertest');

let log;
let nodeEnv;
const minimumLogLevelEnv = process.env.MINIMUM_LOG_LEVEL;

const spyFunc = jest.fn((val) => {
  log = JSON.parse(val.slice(val.indexOf('{')));
});

beforeAll(() => {
  advanceTo(new Date(2019, 1, 1, 0, 0, 0));

  global.console = {log: spyFunc};

  nodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
});

afterEach(() => {
  spyFunc.mockClear();
  log = {};
});

afterAll(() => {
  process.env.NODE_ENV = nodeEnv;
  clear();
});

describe('returns correct log format inside an express pipeline with default logger', () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send({
      formatedRequest: formatNodeRequest({
        req,
        res,
        message: 'this is a log message',
        level: 'error',
        application: 'app-test',
        metrics: {time_taken_micros: 1000},
        context: {exception: 'this is a exception'},
      }),
    });
  });

  app.get('/noreq', (req, res) => {
    logger.info({
      message: 'this is another log message',
      application: 'app-test-2',
      channel: 'app-test-2-channel',
    });

    res.send();
  });

  it('formats log correctly when it has req and res', async () => {
    const response = await request(app).get('/');

    expect(response.body.formatedRequest).toEqual(JSON.stringify({
      message: 'this is a log message',
      level: 3,
      level_name: 'ERROR',
      datetime: new Date().toISOString(),
      application: 'app-test',
      channel: 'app',
      metrics: {time_taken_micros: 1000},
      context: {exception: 'this is a exception'},
      http: {
        method: 'GET',
        uri: '/',
        status: 200,
        local_ip: '::ffff:127.0.0.1',
        user_agent: 'node-superagent/3.8.3',
      },
    }));
  });

  it('formats log correctly without req and res', async () => {
    await request(app).get('/noreq');

    expect(log.message).toEqual('this is another log message');
    expect(log.level_name).toEqual('INFO');
    expect(log.datetime).toEqual(new Date().toISOString());
    expect(log.application).toEqual('app-test-2');
    expect(log.channel).toEqual('app-test-2-channel');
  });
});

describe('returns correct log format inside an express pipeline with request logger', () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send({
      formatedRequest: formatNodeRequest({
        req,
        res,
        message: 'this is a log message',
        level: 'error',
        application: 'app-test',
        metrics: {time_taken_micros: 1000},
        context: {exception: 'this is a exception'},
      }),
    });
  });

  app.get('/noreq', (req, res) => {
    requestLogger.info({
      message: 'this is another log message',
      application: 'app-test-2',
      channel: 'app-test-2-channel',
    });

    res.send();
  });

  it('formats log correctly when it has req and res', async () => {
    const response = await request(app).get('/');

    expect(response.body.formatedRequest).toEqual(JSON.stringify({
      message: 'this is a log message',
      level: 3,
      level_name: 'ERROR',
      datetime: new Date().toISOString(),
      application: 'app-test',
      channel: 'app',
      metrics: {time_taken_micros: 1000},
      context: {exception: 'this is a exception'},
      http: {
        method: 'GET',
        uri: '/',
        status: 200,
        local_ip: '::ffff:127.0.0.1',
        user_agent: 'node-superagent/3.8.3',
      },
    }));
  });

  it('formats log correctly without req and res', async () => {
    await request(app).get('/noreq');

    expect(log.message).toEqual('this is another log message');
    expect(log.level_name).toEqual('INFO');
    expect(log.datetime).toEqual(new Date().toISOString());
    expect(log.application).toEqual('app-test-2');
    expect(log.channel).toEqual('app-test-2-channel');
  });
});

describe('returns correct log format with minimal information', () => {
  it('formats log correctly ', () => {
    const printf = customFormat;
    const value = printf.template({
      message: 'something happened',
      application: 'any-test-app',
      level: 'iNFo',
      metrics: {
        any_metric: 'any_metric_result',
      },
      context: {
        any_context: 'any_context_result_',
      },
    });

    expect(JSON.parse(value)).toMatchObject({
      message: 'something happened',
      level: 6,
      level_name: 'INFO',
      datetime: new Date().toISOString(),
      application: 'any-test-app',
      channel: 'app',
      metrics: {
        any_metric: 'any_metric_result',
      },
      context: {
        any_context: 'any_context_result_',
      },
    });
  });
});

describe('returns correct log format with missing critical information', () => {
  it('parses and format correctly', () => {
    const printf = customFormat;
    const value = printf.template({
      message: 'something happened',
    });

    expect(JSON.parse(value)).toMatchObject({
      message: 'something happened',
      level: false,
    });
  });
});

describe('according to defined a level', () => {
  jest.resetModules();
  process.env.MINIMUM_LOG_LEVEL = 'debug';

  const {logger: loggerLevelTest} = require('./index'); // eslint-disable-line global-require

  afterAll(() => {
    process.env.MINIMUM_LOG_LEVEL = minimumLogLevelEnv;
  });

  it('tries to log a debug', () => {
    loggerLevelTest.debug({
      message: 'debug message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('DEBUG');
    expect(log.level).toBe(7);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('debug message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log an info', () => {
    loggerLevelTest.info({
      message: 'info message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('INFO');
    expect(log.level).toBe(6);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('info message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log a notice', () => {
    loggerLevelTest.notice({
      message: 'notice message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('NOTICE');
    expect(log.level).toBe(5);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('notice message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log a warning', () => {
    loggerLevelTest.warning({
      message: 'warning message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('WARNING');
    expect(log.level).toBe(4);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('warning message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log an error', () => {
    loggerLevelTest.error({
      message: 'error message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('ERROR');
    expect(log.level).toBe(3);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('error message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log a critical', () => {
    loggerLevelTest.critical({
      message: 'critical message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('CRITICAL');
    expect(log.level).toBe(2);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('critical message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log an alert', () => {
    loggerLevelTest.alert({
      message: 'alert message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('ALERT');
    expect(log.level).toBe(1);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('alert message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log an emergency', () => {
    loggerLevelTest.emergency({
      message: 'emergency message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('EMERGENCY');
    expect(log.level).toBe(0);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('emergency message');
    expect(log.datetime).toBe(new Date().toISOString());
  });
});
