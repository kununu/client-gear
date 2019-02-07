import expressLogger from '../middlewares/expressLogger';

const express = require('express');
const request = require('supertest');

describe('kununu Transport for kununu-logger', () => {
  const app = express();
  let originalEnv;
  
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

    // global.console = {
    //   log: spyFunc,
    // };

    await request(app).post('/post').set('x-amzn-trace-id', 'trace-id-1');
    await request(app).get('/').set('x-amzn-trace-id', 'trace-id-2');
    await request(app).get('/').set('x-amzn-trace-id', 'trace-id-3');
    await request(app).get('/error').set('x-amzn-trace-id', 'trace-id-3');
    
    // const logObjectRequest = JSON.parse(spyFunc.mock.calls);
    // expect(logObjectRequest).toMatchObject({1: 'b'});
  });
});
