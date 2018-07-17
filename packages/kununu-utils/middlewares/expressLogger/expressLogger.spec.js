import expressLogger from './index';

const express = require('express');
const request = require('supertest');

describe('Express logger', () => {
  const app = express();
  app.get('/', expressLogger('app-reviews'), (req, res) => {
    res.send();
  });

  it('Log one intial request and one final request', async () => {
    const spyFunc = jest.fn();

    global.console = {
      log: spyFunc,
    };

    await request(app).get('/');
    expect(spyFunc.mock.calls.length).toEqual(2);
  });
});
