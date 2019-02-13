import expressLogger from '../middlewares/expressLogger';

const express = require('express');
const request = require('supertest');

describe('Fingers Crossed transport for kununu-logger', () => {
  const app = express();

  app.use(expressLogger('app'));

  app.get('/', (req, res) => {
    res.send();
  });

  app.post('/post', (req, res) => {
    res.send();
  });

  app.get('/error', (req, res) => {
    res.status(500).send();
  });

  it('logs requests and return errors and previous requests that share same trace id', async () => {
    const spyFunc = jest.fn();

    global.console = {
      log: spyFunc,
    };

    await request(app).post('/post').set('x-amzn-trace-id', 'trace-id-1');
    await request(app).get('/').set('x-amzn-trace-id', 'trace-id-2');
    await request(app).get('/').set('x-amzn-trace-id', 'trace-id-3');
    await request(app).get('/').set('x-amzn-trace-id', 'trace-id-3');
    await request(app).get('/error').set('x-amzn-trace-id', 'trace-id-3');

    expect(spyFunc.mock.calls.length).toBe(3);
    expect(JSON.parse(spyFunc.mock.calls[0]).trace_id).toBe('trace-id-3');
    expect(JSON.parse(spyFunc.mock.calls[1]).trace_id).toBe('trace-id-3');
    expect(JSON.parse(spyFunc.mock.calls[2]).trace_id).toBe('trace-id-3');
  });

  it('logs requests and return nothing because there are no errors', async () => {
    const spyFunc = jest.fn();

    global.console = {
      log: spyFunc,
    };

    await request(app).post('/post').set('x-amzn-trace-id', 'trace-id-1');
    await request(app).get('/').set('x-amzn-trace-id', 'trace-id-2');
    await request(app).get('/').set('x-amzn-trace-id', 'trace-id-3');

    expect(spyFunc.mock.calls.length).toBe(0);
  });
});
