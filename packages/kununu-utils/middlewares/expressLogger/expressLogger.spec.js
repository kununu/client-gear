import expressLogger from './index';

const express = require('express');
const request = require('supertest');

describe('Express logger', () => {
  const app = express();
  let originalEnv;
  
  app.use(expressLogger('app'));

  app.get('/', (req, res) => {
    res.header('x-amzn-trace-id', '0000');
    res.send();
  });

  app.get('/error', (req, res) => {
    res.header('x-amzn-trace-id', '0000');
    res.status(500).send();
  });

  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it.skip('logs a request with the expected info', async () => {
    const spyFunc = jest.fn();

    global.console = {
      log: spyFunc,
    };

    await request(app).get('/');
    expect(spyFunc.mock.calls.length).toEqual(1);
    const logObjectRequest = JSON.parse(spyFunc.mock.calls[0][0]);
    expect(Object.keys(logObjectRequest).sort()).toEqual(['label', 'logType', 'time', 'method', 'request', 'status', 'remote_ip', 'referer', 'forwarded_for', 'trace_id', 'user_agent', 'time_taken_micros', 'build'].sort());
  });
  
  it.only('logs a request and throw an error', async () => {
    // const spyFunc = jest.fn();

    // global.console = {
    //   log: spyFunc,
    // };

    await request(app).get('/');
    await request(app).get('/');
    await request(app).get('/');
    await request(app).get('/');
    await request(app).get('/error');
    // expect(spyFunc.mock.calls.length).toEqual(2);
  });
});
