import {advanceTo, clear} from 'jest-date-mock'; // eslint-disable-line import/no-extraneous-dependencies

import expressLogger from './index';

const express = require('express');
const request = require('supertest');

describe('expressLogger middleware', () => {
  const app = express();

  app.get('/', expressLogger(), (req, res) => {
    res.send();
  });

  let nodeEnv;
  const spyFunc = jest.fn();

  beforeAll(() => {
    advanceTo(new Date(2019, 1, 1, 0, 0, 0));

    global.console = {log: spyFunc};

    nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    spyFunc.mockClear();
  });

  afterAll(() => {
    process.env.NODE_ENV = nodeEnv;
    clear();
  });

  it('formats log correctly on request out', async () => {
    await request(app).get('/');

    expect(spyFunc.mock.calls.length).toBe(1);
    expect(JSON.parse(spyFunc.mock.calls[1][0])).toMatchObject({
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
    });
  });
});
