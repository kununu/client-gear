import expressLogger from './index';

const express = require('express');
const request = require('supertest');

describe('Express logger', () => {
  const app = express();
  let originalEnv;

  app.get('/', expressLogger('app-reviews'), (req, res) => {
    res.send();
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
    expect(spyFunc.mock.calls.length).toEqual(1);
    const logObjectRequest = JSON.parse(spyFunc.mock.calls[0][0]);

    expect(Object.keys(logObjectRequest).sort()).toEqual(['level_name', 'datetime', 'trace_id', 'build', 'application', 'http', 'channel', 'metrics', 'context'].sort());
  });
});
