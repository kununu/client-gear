import {createLogger, format} from 'winston';
import {Request} from 'jest-express/lib/request';
import {Response} from 'jest-express/lib/response';
import {advanceTo, clear} from 'jest-date-mock'; // eslint-disable-line import/no-extraneous-dependencies

import {loggingLevels, customFormat} from '../index';

import FingersCrossed from './index';

const {timestamp} = format;

let nodeEnv;
let req;
let res;

const spy = jest.spyOn(global.console, 'log');
const logger = createLogger({
  levels: loggingLevels,
  format: format.combine(
    timestamp(),
    customFormat,
  ),
  transports: new FingersCrossed({
    level: 'debug',
    minimumLogLevel: 'debug',
    activationLogLevel: 'error',
  }),
});

beforeAll(() => {
  nodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
});

beforeEach(() => {
  req = new Request();
  res = new Response('/');
});

afterEach(() => {
  req.resetMocked();
  res.resetMocked();
});

afterAll(() => {
  process.env.NODE_ENV = nodeEnv;
});

describe('returns all logs formatted', () => {
  beforeAll(() => {
    advanceTo(new Date(2019, 1, 1, 0, 0, 0));
  });

  afterEach(() => {
    spy.mockClear();
  });

  afterAll(() => {
    clear();
  });

  it('returns formatted log when request has trace id', () => {
    req.setOriginalUrl('/fingerscrossed');
    req.setHeaders({
      referer: '/path',
      'x-amzn-trace-id': 'trace-id-999',
      'x-forwarded-for': '0.0.0.0',
    });

    logger.error({
      req,
      res,
      application: 'app-format',
      channel: 'format',
      context: {exception: 'an exception here'},
      message: 'This log has the right format',
      metrics: {time_taken_micros: 999},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls)).toEqual(expect.objectContaining({
      application: 'app-format',
      channel: 'format',
      context: {exception: 'an exception here'},
      datetime: new Date().toISOString(),
      http: {
        method: 'GET',
        referer: '/path',
        remote_ip: '0.0.0.0',
        uri: '/fingerscrossed',
      },
      level: 3,
      level_name: 'ERROR',
      message: 'This log has the right format',
      metrics: {time_taken_micros: 999},
      trace_id: 'trace-id-999',
    }));
  });

  it('returns formatted log when request is missing trace id', () => {
    req.setOriginalUrl('/fingerscrossed2');
    req.setHeaders({
      referer: '/path2',
      'x-forwarded-for': '1.1.1.1',
    });

    logger.error({
      req,
      res,
      application: 'app-format',
      channel: 'format',
      context: {exception: 'an exception here'},
      message: 'This log has the right format',
      metrics: {time_taken_micros: 999},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls)).toEqual(expect.objectContaining({
      application: 'app-format',
      channel: 'format',
      context: {exception: 'an exception here'},
      datetime: new Date().toISOString(),
      http: {
        method: 'GET',
        referer: '/path2',
        remote_ip: '1.1.1.1',
        uri: '/fingerscrossed2',
      },
      level: 3,
      level_name: 'ERROR',
      message: 'This log has the right format',
      metrics: {time_taken_micros: 999},
    }));
  });

  it('returns no log when request has trace id but is below activation trigger level', () => {
    req.setOriginalUrl('/fingerscrossed');
    req.setHeaders({
      referer: '/path',
      'x-amzn-trace-id': 'trace-id-999',
      'x-forwarded-for': '0.0.0.0',
    });

    logger.info({
      req,
      res,
      application: 'app-format',
      channel: 'format',
      context: {exception: 'an exception here'},
      message: 'This log has the right format',
      metrics: {time_taken_micros: 999},
    });

    expect(spy.mock.calls.length).toBe(0);
  });

  it('returns log that are messages formatted', () => {
    logger.info({
      application: 'app-format',
      channel: 'format',
      context: {exception: 'an exception here'},
      message: 'This log has the right format',
      metrics: {time_taken_micros: 999},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls)).toMatchObject({
      application: 'app-format',
      channel: 'format',
      context: {exception: 'an exception here'},
      datetime: new Date().toISOString(),
      level: 6,
      level_name: 'INFO',
      message: 'This log has the right format',
      metrics: {time_taken_micros: 999},
    });
  });
});

describe('returns logs (or not) by defined rules', () => {
  const application = 'app-fingerscrossed';
  const channel = 'middleware';
  const message = 'any message';

  it('saves on state because is request with trace ID', async () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-1');

    await logger.info({
      req,
      res,
      application,
      channel,
      message,
      metrics: {time_taken_micros: 1},
    });

    expect(spy.mock.calls.length).toBe(0);
  });

  it('saves on state because is a request with trace ID', async () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-1');

    await logger.debug({
      req,
      res,
      application,
      channel,
      message,
      metrics: {time_taken_micros: 2},
    });

    expect(spy.mock.calls.length).toBe(0);
  });

  it('outputs immediately because is a request without trace ID', async () => {
    await logger.debug({
      req,
      res,
      application,
      channel,
      message,
      metrics: {time_taken_micros: 3},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls).metrics.time_taken_micros).toBe(3);

    spy.mockClear();
  });

  it('outputs immediately because is a custom error without request', async () => {
    await logger.info({
      application,
      message,
      metrics: {time_taken_micros: 4},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls).metrics.time_taken_micros).toBe(4);

    spy.mockClear();
  });

  it('saves on state because is a request with trace ID', async () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-1');

    await logger.warning({
      req,
      res,
      application,
      channel,
      message,
      metrics: {time_taken_micros: 5},
    });

    expect(spy.mock.calls.length).toBe(0);
  });

  it('outputs logs (1, 2, 5, 6) because has reached activation log level', async () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-1');

    await logger.error({
      req,
      res,
      application,
      message,
      metrics: {time_taken_micros: 6},
    });

    expect(spy.mock.calls.length).toBe(4);
    expect(JSON.parse(spy.mock.calls[0]).metrics.time_taken_micros).toBe(1);
    expect(JSON.parse(spy.mock.calls[1]).metrics.time_taken_micros).toBe(2);
    expect(JSON.parse(spy.mock.calls[2]).metrics.time_taken_micros).toBe(5);
    expect(JSON.parse(spy.mock.calls[3]).metrics.time_taken_micros).toBe(6);

    spy.mockClear();
  });

  it('saves on state because is a request with trace ID', async () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-2');

    await logger.info({
      req,
      res,
      application,
      message,
      metrics: {time_taken_micros: 7},
    });

    expect(spy.mock.calls.length).toBe(0);
  });

  it('outputs immediately because is a request without trace ID', async () => {
    await logger.debug({
      req,
      res,
      application,
      message,
      metrics: {time_taken_micros: 8},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls[0]).metrics.time_taken_micros).toBe(8);

    spy.mockClear();
  });

  it('outputs immediately because is a custom error without request', async () => {
    await logger.error({
      application,
      message,
      metrics: {time_taken_micros: 9},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls[0]).metrics.time_taken_micros).toBe(9);

    spy.mockClear();
  });

  it('outputs logs (7, 10) because has reached activation log level', async () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-2');

    await logger.error({
      req,
      res,
      application,
      message,
      metrics: {time_taken_micros: 10},
    });

    expect(spy.mock.calls.length).toBe(2);
    expect(JSON.parse(spy.mock.calls[0]).metrics.time_taken_micros).toBe(7);
    expect(JSON.parse(spy.mock.calls[1]).metrics.time_taken_micros).toBe(10);

    spy.mockClear();
  });
});
