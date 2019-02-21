import {advanceTo, clear} from 'jest-date-mock';

import {formatNodeRequest, logger, customFormat} from './index';

const express = require('express');
const request = require('supertest');

process.env.MINIMUM_LOG_LEVEL = 'build-123';
let generatedLog = '';

const spyFunc = jest.fn((val) => {
  generatedLog = JSON.parse(val.slice(val.indexOf('{')));
});

global.console = {log: spyFunc};

afterEach(() => {
  spyFunc.mockClear();
  generatedLog = '';
});

describe('Returns correct log format with text format', () => {
  const app = express();

  beforeAll(() => {
    advanceTo(new Date(2019, 2, 19, 0, 0, 0));
  });

  afterAll(() => {
    clear();
  });

  it('returns correct format for express request logs', async () => {
    const label = 'test1';

    const expectedRequest = {
      message: 'this is a log message',
      level_name: 'INFO',
      time: new Date().toISOString(),
      trace_id: '-',
      build: '-',
      application: label,
      http: {
        method: 'GET',
        uri: '/',
        status: 200,
        remote_ip: '::ffff:127.0.0.1',
        local_ip: '-',
        referer: '-',
        user_agent: 'node-superagent/3.8.2',
      },
      channel: label,
      metrics: {
        time_taken_micros: 1000,
      },
    };

    app.get('/', (req, res) => {
      res.send({
        formatedRequest: formatNodeRequest({req, res, label, timeTakenMicros: 1000, level: 'info', message: 'this is a log message'}),
      });
    });

    const response = await request(app).get('/');
    expect(response.body.formatedRequest).toEqual(JSON.stringify(expectedRequest));
  });

  it('returns expected format for custom request logs', async () => {
    const label = 'test2';

    app.get('/2', (req, res) => {
      logger.log('info', {
        custom: true,
        message: 'Test',
        label,
      });

      res.send();
    });

    await request(app).get('/2');
    expect(generatedLog.custom).toEqual(true);
    expect(generatedLog.message).toEqual('Test');
    expect(generatedLog.level).toEqual('info');
    expect(generatedLog.label).toEqual(label);
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
      custom: true,
    };

    const printf = customFormat;
    const value = printf.template(info);
    expect(JSON.parse(value)).toEqual({
      build: '-',
      label: 'test',
      level: 'info',
      custom: true,
      logType: 'custom_logger',
    });
  });
});

describe('Logs according to defined level', () => {
  let originalEnv = process.env.MINIMUM_LOG_LEVEL;
  jest.resetModules();
  process.env.MINIMUM_LOG_LEVEL = 'debug';
  const {logger: loggerLevelTest} = require('./index');

  afterAll(() => {
    process.env.MINIMUM_LOG_LEVEL = originalEnv;
  });

  it('tries to log silly level', () => {
    loggerLevelTest.silly({
      custom: true,
      message: 'silly - Will not be logged',
    });

    expect(spyFunc).not.toBeCalled();
    expect(generatedLog.level).toEqual(undefined);
  });

  it('tries to log debug level with log and level', () => {
    loggerLevelTest.log({
      custom: true,
      message: 'debug - Will be logged with log and level',
      level: 'debug',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level).toEqual('debug');
  });

  it('tries to log debug level with debug', () => {
    loggerLevelTest.debug({
      custom: true,
      message: 'debug - Will be logged with debug',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level).toEqual('debug');
  });

  it('tries to log verbose level', () => {
    loggerLevelTest.verbose({
      custom: true,
      message: 'verbose - Will be logged',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level).toEqual('verbose');
  });

  it('tries to log info level', () => {
    loggerLevelTest.info({
      custom: true,
      message: 'info - Will be logged',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level).toEqual('info');
  });

  it('tries to log warn level', () => {
    loggerLevelTest.warn({
      custom: true,
      message: 'warn - Will be logged',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level).toEqual('warn');
  });

  it('tries to log error level', () => {
    loggerLevelTest.error({
      custom: true,
      message: 'error - Will be logged',
    });

    expect(spyFunc).toBeCalled();
    expect(generatedLog.level).toEqual('error');
  });
});
