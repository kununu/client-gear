import {formatNodeRequest, logger} from './index';

const express = require('express');
const request = require('supertest');

describe('Returns correct log format', () => {
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
      };

      res.send({
        formatedRequest: formatNodeRequest({req, res, label}),
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
