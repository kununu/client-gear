import {formatNodeRequest, logger, customFormat} from './index';

const express = require('express');
const request = require('supertest');

describe('Returns correct log format with text format', () => {
  const app = express();

  it('returns correct format for express request logs', async () => {
    const label = 'test1';

    app.get('/', (req, res) => {
      const expectedRequest = {
        label,
        time: new Date().toISOString(),
        method: req.method,
        request: req.originalUrl,
        status: res.statusCode,
        remote_ip: '::ffff:127.0.0.1',
        referer: '-',
        forwarded_for: '-',
        trace_id: '-',
        logType: 'middleware_logger',
        timeTakenMicros: 1000,
      };

      res.send({
        formatedRequest: formatNodeRequest({req, res, label, timeTakenMicros: 1000}),
        expectedRequest,
      });
    });

    const response = await request(app).get('/');
    expect(response.formatedRequest).toEqual(JSON.stringify(response.expectedRequest));
  });

  it('returns expected format for custom request logs', async () => {
    const label = 'test2';
    let generatedLog = '';

    const spyFunc = jest.fn((val) => {
      generatedLog = JSON.parse(val.slice(val.indexOf('{')));
    });

    global.console = {log: spyFunc};

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
      label: 'test',
      level: 'info',
      custom: true,
      logType: 'custom_logger',
    });
  });
});
