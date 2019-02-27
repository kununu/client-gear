import {advanceTo, clear} from 'jest-date-mock';

import {formatNodeRequest, logger, customFormat} from './index';

const express = require('express');
const request = require('supertest');

process.env.NODE_ENV = 'production';

let generatedLog = '';

const spyFunc = jest.fn((val) => {
  generatedLog = JSON.parse(val.slice(val.indexOf('{')));
});

global.console = {log: spyFunc};

afterEach(() => {
  spyFunc.mockClear();
  generatedLog = '';
});

beforeAll(() => {
  advanceTo(new Date(2019, 1, 1, 0, 0, 0));
});

afterAll(() => {
  clear();
});

describe('Returns correct log format with text format', () => {
  const app = express();

  it('returns correct format for express request logs', async () => {
    const application = 'test1';

    const expectedRequest = {
      message: 'this is a log message',
      level: 3,
      level_name: 'ERROR',
      datetime: new Date().toISOString(),
      application,
      http: {
        method: 'GET',
        uri: '/',
        status: 200,
        local_ip: '::ffff:127.0.0.1',
        user_agent: 'node-superagent/3.8.3',
      },
      channel: 'app',
      metrics: {
        time_taken_micros: 1000,
      },
      context: {
        exception: 'this is a exception',
      },
    };

    app.get('/', (req, res) => {
      res.send({
        formatedRequest: formatNodeRequest({
          req,
          res,
          application,
          level: 'error',
          metrics: {time_taken_micros: 1000},
          message: 'this is a log message',
          context:{exception: 'this is a exception'},
        }),
      });
    });

    const response = await request(app).get('/');

    expect(response.body.formatedRequest).toEqual(JSON.stringify(expectedRequest));
  });

  it('returns expected log format for app logger request', async () => {
    const application = 'test2';

    app.get('/2', (req, res) => {
      logger.info({
        application,
        message: 'test',
      });

      res.send();
    });

    await request(app).get('/2');

    expect(generatedLog.message).toEqual('test');
    expect(generatedLog.level_name).toEqual('INFO');
    expect(generatedLog.datetime).toEqual(new Date().toISOString());
    expect(generatedLog.application).toEqual('test2');
    expect(generatedLog.channel).toEqual('app');
  });
});

describe('Returns correct log format with json format', () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('returns correct log', () => {
    const info = {
      application: 'test',
      level: 'info',
    };

    const printf = customFormat;
    const value = printf.template(info);

    expect(JSON.parse(value)).toEqual({
      level: 6,
      level_name: 'INFO',
      datetime: new Date().toISOString(),
      application: 'test',
      channel: 'app',
    });
  });
});

describe('According to defined a level', () => {
  jest.resetModules();
  process.env.MINIMUM_LOG_LEVEL = 'debug';
  const {logger: loggerLevelTest} = require('./index'); // eslint-disable-line global-require

  it('logs a debug', () => {
    loggerLevelTest.debug({
      message: 'debug message',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toBe('DEBUG');
    expect(generatedLog.level).toBe(7);
    expect(generatedLog.channel).toBe('app');
    expect(generatedLog.message).toBe('debug message');
    expect(generatedLog.datetime).toBe(new Date().toISOString());
  });

  it('logs an info', () => {
    loggerLevelTest.info({
      message: 'info message',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toBe('INFO');
    expect(generatedLog.level).toBe(6);
    expect(generatedLog.channel).toBe('app');
    expect(generatedLog.message).toBe('info message');
    expect(generatedLog.datetime).toBe(new Date().toISOString());
  });

  it('logs a notice', () => {
    loggerLevelTest.notice({
      message: 'notice message',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toBe('NOTICE');
    expect(generatedLog.level).toBe(5);
    expect(generatedLog.channel).toBe('app');
    expect(generatedLog.message).toBe('notice message');
    expect(generatedLog.datetime).toBe(new Date().toISOString());
  });

  it('logs a warning', () => {
    loggerLevelTest.warning({
      message: 'warning message',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toBe('WARNING');
    expect(generatedLog.level).toBe(4);
    expect(generatedLog.channel).toBe('app');
    expect(generatedLog.message).toBe('warning message');
    expect(generatedLog.datetime).toBe(new Date().toISOString());
  });

  it('logs an error', () => {
    loggerLevelTest.error({
      message: 'error message',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toBe('ERROR');
    expect(generatedLog.level).toBe(3);
    expect(generatedLog.channel).toBe('app');
    expect(generatedLog.message).toBe('error message');
    expect(generatedLog.datetime).toBe(new Date().toISOString());
  });

  it('logs a critical', () => {
    loggerLevelTest.critical({
      message: 'critical message',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toBe('CRITICAL');
    expect(generatedLog.level).toBe(2);
    expect(generatedLog.channel).toBe('app');
    expect(generatedLog.message).toBe('critical message');
    expect(generatedLog.datetime).toBe(new Date().toISOString());
  });

  it('logs an alert', () => {
    loggerLevelTest.alert({
      message: 'alert message',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toBe('ALERT');
    expect(generatedLog.level).toBe(1);
    expect(generatedLog.channel).toBe('app');
    expect(generatedLog.message).toBe('alert message');
    expect(generatedLog.datetime).toBe(new Date().toISOString());
  });

  it('logs an emergency', () => {
    loggerLevelTest.emergency({
      message: 'emergency message',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toBe('EMERGENCY');
    expect(generatedLog.level).toBe(0);
    expect(generatedLog.channel).toBe('app');
    expect(generatedLog.message).toBe('emergency message');
    expect(generatedLog.datetime).toBe(new Date().toISOString());
  });
});
