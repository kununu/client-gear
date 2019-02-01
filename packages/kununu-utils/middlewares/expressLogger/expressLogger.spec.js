import expressLogger from './index';

const express = require('express');
const request = require('supertest');

describe('Express logger', () => {
  const app = express();
  let originalEnv;
  app.use(expressLogger('app'));
  app.get('/', (req, res) => {
    res.status(500).send();
  });

  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('Logs a request with the expected info', async () => {
    const spyFunc = jest.fn();

    global.console = {
      log: spyFunc,
    };

    await request(app).get('/');
    expect(spyFunc.mock.calls.length).toEqual(2);
    const logObjectRequest = JSON.parse(spyFunc.mock.calls[1][0]);
    expect(Object.keys(logObjectRequest).sort()).toEqual(['build', 'label', 'logType', 'time', 'method', 'request', 'status', 'remote_ip', 'referer', 'forwarded_for', 'trace_id', 'user_agent', 'time_taken_micros'].sort());
  });
});
