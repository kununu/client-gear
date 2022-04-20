import {advanceTo, clear} from 'jest-date-mock'; // eslint-disable-line import/no-extraneous-dependencies

import 'isomorphic-fetch';

import applicationSchema from './application.schema.json';

import expressLogger from './index';

const express = require('express');
const request = require('supertest');
const Ajv = require('ajv');

describe('expressLogger middleware', () => {
  const app = express();

  app.get('/', expressLogger('app-example'), (req, res) => {
    res.send();
  });

  let nodeEnv;
  let defaultConsole;
  const spyFunc = jest.fn();
  const errorFunc = jest.fn();
  const warnFunc = jest.fn();

  beforeAll(() => {
    advanceTo(new Date(2019, 1, 1, 0, 0, 0));

    defaultConsole = global.console;

    global.console = {
      log: spyFunc,
      error: errorFunc,
      warn: warnFunc,
    };

    nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    spyFunc.mockClear();
    errorFunc.mockClear();
    warnFunc.mockClear();
  });

  afterAll(() => {
    process.env.NODE_ENV = nodeEnv;
    clear();
  });

  it('formats log correctly on request out', async () => {
    await request(app).get('/');

    expect(spyFunc.mock.calls.length).toBe(2);
    expect(JSON.parse(spyFunc.mock.calls[0][0])).toMatchObject({
      message: 'Got request - GET /',
      level: 6,
      level_name: 'INFO',
      datetime: new Date().toISOString(),
      http: {
        method: 'GET',
        request: '/',
        status: 200,
        local_ip: '::ffff:127.0.0.1',
        user_agent: 'node-superagent/3.8.3',
      },
      channel: 'middleware',
    });
    expect(JSON.parse(spyFunc.mock.calls[1][0])).toMatchObject({
      message: 'Request Out: 200 OK - GET / - origin finish',
      level: 6,
      level_name: 'INFO',
      datetime: new Date().toISOString(),
      http: {
        method: 'GET',
        request: '/',
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

  it('validates initial log json schema', async () => {
    const schema = applicationSchema;

    const ajv = new Ajv({allErrors: true});

    await request(app)
      .get('/')
      .set('x-real-ip', '127.0.0.1')
      .set('x-forwarded-host', 'www.test.dev')
      .set('x-amzn-trace-id', 'Root=1-67891233-abcdef012345678912345678');
    const output = JSON.parse(spyFunc.mock.calls[0][0]);

    const validate = await ajv.compile(schema);

    const valid = validate(output);

    if (!valid) {
      defaultConsole.log(validate.errors);
    }

    expect(valid).toEqual(true);
  });

  it('validates log json schema', async () => {
    const schema = applicationSchema;

    const ajv = new Ajv({allErrors: true});

    await request(app)
      .get('/')
      .set('x-real-ip', '127.0.0.1')
      .set('x-forwarded-host', 'www.test.dev')
      .set('x-amzn-trace-id', 'Root=1-67891233-abcdef012345678912345678');
    const output = JSON.parse(spyFunc.mock.calls[1][0]);

    const validate = await ajv.compile(schema);

    const valid = validate(output);

    if (!valid) {
      defaultConsole.log(validate.errors);
    }

    expect(valid).toEqual(true);
  });
});
