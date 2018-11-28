import addServerTimingHeader from './addServerTimingHeader';
import {SERVER_TIMING} from './constants';

import serverTiming from './index';

const express = require('express');
const request = require('supertest');

jest.mock('./addServerTimingHeader', () => jest.fn());

describe('serverTiming middleware', () => {
  const app = express();
  const label = 'myapp';

  beforeEach(() => {
    addServerTimingHeader.mockClear();
  });

  app.get('/', serverTiming(label), (req, res) => {
    res.send();
  });

  it('sets server timing headers for a request', async () => {
    addServerTimingHeader.mockImplementation((res) => {
      res.setHeader(SERVER_TIMING, 'my custom header');
    });

    await request(app)
      .get('/')
      .expect(SERVER_TIMING, 'my custom header');
  });
});
