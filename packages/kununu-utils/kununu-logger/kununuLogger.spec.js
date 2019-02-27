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
  advanceTo(new Date(2019, 2, 19, 0, 0, 0));
});

afterAll(() => {
  clear();
});

describe('Returns correct log format with text format', () => {
  const app = express();

  it('returns correct format for express request logs', async () => {
    const label = 'test1';

    const expectedRequest = {
      message: 'this is a log message',
      level_name: 'ERROR',
      datetime: new Date().toISOString(),
      trace_id: '-',
      build: '-',
      application: label,
      http: {
        method: 'GET',
        uri: '/',
        status: 200,
        remote_ip: '-',
        local_ip: '::ffff:127.0.0.1',
        referer: '-',
        user_agent: 'node-superagent/3.8.3',
      },
      channel: 'middleware_logger',
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
          req, res, label, timeTakenMicros: 1000, level: 'error', message: 'this is a log message', exception: 'this is a exception', middleware: true,
        }),
      });
    });

    const response = await request(app).get('/');

    expect(response.body.formatedRequest).toEqual(JSON.stringify(expectedRequest));
  });

  it('returns expected log format for app logger request', async () => {
    const label = 'test2';

    app.get('/2', (req, res) => {
      logger.info({
        message: 'test',
        label,
      });

      res.send();
    });

    await request(app).get('/2');

    expect(generatedLog.message).toEqual('test');
    expect(generatedLog.level_name).toEqual('INFO');
    expect(generatedLog.datetime).toEqual(new Date().toISOString());
    expect(generatedLog.build).toEqual('-');
    expect(generatedLog.application).toEqual('test2');
    expect(generatedLog.channel).toEqual('app_logger');
    expect(generatedLog.context).toEqual({});
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
      label: 'test',
      level: 'info',
    };

    const printf = customFormat;
    const value = printf.template(info);

    expect(JSON.parse(value)).toEqual({
      level_name: 'INFO',
      datetime: new Date().toISOString(),
      build: '-',
      application: 'test',
      channel: 'app_logger',
      context: {},
      http: {
        local_ip: '-',
        referer: '-',
        remote_ip: '-',
        user_agent: '-',
      },
      metrics: {},
      trace_id: '-',
    });
  });
});

describe('Logs according to defined level', () => {
  jest.resetModules();
  process.env.MINIMUM_LOG_LEVEL = 'debug';
  const {logger: loggerLevelTest} = require('./index'); // eslint-disable-line global-require

  it('tries to log silly level', () => {
    loggerLevelTest.silly({
      message: 'silly - Message will not be logged',
    });

    expect(spyFunc).not.toBeCalled();
    expect(generatedLog.level_name).toEqual(undefined);
  });

  it('tries to log debug level with log and level', () => {
    loggerLevelTest.debug({
      message: 'debug - Message will be logged with log and level',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toEqual('DEBUG');
    expect(generatedLog.message).toEqual('debug - Message will be logged with log and level');
    expect(generatedLog.datetime).toEqual(new Date().toISOString());
    expect(generatedLog.build).toEqual('-');
    expect(generatedLog.channel).toEqual('app_logger');
    expect(generatedLog.context).toEqual({});
  });

  it('tries to log debug level with debug', () => {
    loggerLevelTest.debug({
      message: 'debug - Message will be logged with debug',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toEqual('DEBUG');
    expect(generatedLog.message).toEqual('debug - Message will be logged with debug');
    expect(generatedLog.datetime).toEqual(new Date().toISOString());
    expect(generatedLog.build).toEqual('-');
    expect(generatedLog.channel).toEqual('app_logger');
    expect(generatedLog.context).toEqual({});
  });

  it('tries to log verbose level', () => {
    loggerLevelTest.verbose({
      message: 'verbose - Message will be logged',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toEqual('VERBOSE');
    expect(generatedLog.message).toEqual('verbose - Message will be logged');
    expect(generatedLog.datetime).toEqual(new Date().toISOString());
    expect(generatedLog.build).toEqual('-');
    expect(generatedLog.channel).toEqual('app_logger');
    expect(generatedLog.context).toEqual({});
  });

  it('tries to log info level', () => {
    loggerLevelTest.info({
      message: 'info - Message will be logged',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toEqual('INFO');
    expect(generatedLog.message).toEqual('info - Message will be logged');
    expect(generatedLog.datetime).toEqual(new Date().toISOString());
    expect(generatedLog.build).toEqual('-');
    expect(generatedLog.channel).toEqual('app_logger');
    expect(generatedLog.context).toEqual({});
  });

  it('tries to log warn level', () => {
    loggerLevelTest.warn({
      message: 'warn - Message will be logged',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toEqual('WARN');
    expect(generatedLog.message).toEqual('warn - Message will be logged');
    expect(generatedLog.datetime).toEqual(new Date().toISOString());
    expect(generatedLog.build).toEqual('-');
    expect(generatedLog.channel).toEqual('app_logger');
    expect(generatedLog.context).toEqual({});
  });

  it('tries to log error level', () => {
    loggerLevelTest.error({
      message: 'error - Message will be logged',
      exception: 'error - Exception will be logged',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level_name).toEqual('ERROR');
    expect(generatedLog.message).toEqual('error - Message will be logged');
    expect(generatedLog.context.exception).toEqual('error - Exception will be logged');
  });
});
