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
    const currentDate = new Date('2018-01-01T12:00:00');
    const spyFunc = jest.fn(val => JSON.stringify(val));

    global.Date = jest.fn(() => currentDate);
    global.console = {log: spyFunc};

    app.get('/2', (req, res) => {
      logger.log('info', {
        custom: true,
        message: 'This is a test log',
        label,
      });

      res.send();
    });

    await request(app).get('/2');
    expect(spyFunc.mock.calls[0][0]).toEqual('\u001b[32m[test2][2018-01-01T11:00:00.000Z][info]\u001b[0m – custom logger - {"custom":true,"message":"This is a test log","label":"test2","level":"info","timestamp":"2018-01-01T11:00:00.000Z"}');
  });
});
