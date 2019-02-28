import {advanceTo, clear} from 'jest-date-mock';

import expressLogger from './index';

const express = require('express');
const request = require('supertest');

describe('Express logger', () => {
  const app = express();

  app.get('/', expressLogger('app-example'), (req, res) => {
    res.send();
  });

  const spyFunc = jest.fn();

  global.console = {log: spyFunc};

  const nodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';

  beforeAll(() => {
    advanceTo(new Date(2019, 1, 1, 0, 0, 0));
  });

  afterAll(() => {
    process.env.NODE_ENV = nodeEnv;
    clear();
  });

  afterEach(() => {
    spyFunc.mockClear();
  });

  it('logs a request in', async () => {
    const expectedRequestIn = {
      message: 'Request In: GET /',
      level: 6,
      level_name: 'INFO',
      datetime: new Date().toISOString(),
      application: 'app-example',
      http: {
        method: 'GET',
        uri: '/',
        local_ip: '::ffff:127.0.0.1',
        user_agent: 'node-superagent/3.8.3',
      },
      channel: 'middleware',
    };

    await request(app).get('/');

    expect(spyFunc.mock.calls.length).toBe(2);
    expect(JSON.parse(spyFunc.mock.calls[0][0])).toMatchObject(expectedRequestIn);
  });

  it('logs a request out', async () => {
    const expectedRequestOut = {
      message: 'Request Out: 200 OK - GET /',
      level: 6,
      level_name: 'INFO',
      datetime: new Date().toISOString(),
      application: 'app-example',
      http: {
        method: 'GET',
        uri: '/',
        status: 200,
        local_ip: '::ffff:127.0.0.1',
        user_agent: 'node-superagent/3.8.3',
      },
      channel: 'middleware',
      metrics: {
        time_taken_micros: 0,
      },
    };

    await request(app).get('/');

    expect(spyFunc.mock.calls.length).toBe(2);
    expect(JSON.parse(spyFunc.mock.calls[1][0])).toMatchObject(expectedRequestOut);
  });
});
