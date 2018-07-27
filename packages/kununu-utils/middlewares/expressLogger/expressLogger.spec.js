import expressLogger from './index';

const express = require('express');
const request = require('supertest');

describe('Express logger', () => {
  const app = express();
  let logAs;
  app.get('/', expressLogger('app-reviews'), (req, res) => {
    res.send();
  });

  beforeAll(() => {
    logAs = process.env.LOG_AS;
    process.env.LOG_AS = 'json';
  });

  afterAll(() => {
    process.env.LOG_AS = logAs;
  });

  it('Log one intial request and one final request', async () => {
    const spyFunc = jest.fn();

    global.console = {
      log: spyFunc,
    };

    await request(app).get('/');
    expect(spyFunc.mock.calls.length).toEqual(2);
    const logObjectRequestStart = JSON.parse(spyFunc.mock.calls[0][0]);
    const logObjectRequestEnd = JSON.parse(spyFunc.mock.calls[1][0]);
    expect(Object.keys(logObjectRequestStart).sort()).toEqual(['label', 'logType', 'time', 'method', 'request', 'status', 'remote_ip', 'referer', 'forwarded_for', 'trace_id', 'user_agent'].sort());
    expect(Object.keys(logObjectRequestEnd).sort()).toEqual(['label', 'logType', 'time', 'method', 'request', 'status', 'remote_ip', 'referer', 'forwarded_for', 'trace_id', 'user_agent', 'time_taken_micros'].sort());
  });
});
