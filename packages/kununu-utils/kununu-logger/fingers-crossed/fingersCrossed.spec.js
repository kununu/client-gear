import {createLogger, format} from 'winston';
import {Request} from 'jest-express/lib/request';
import {Response} from 'jest-express/lib/response';

import {loggingLevels, customFormat} from '../index';

import FingersCrossed from './index';

const {timestamp} = format;

describe('Fingers Crossed transport for kununu-logger', () => {
  let nodeEnv;

  beforeAll(() => {
    nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = nodeEnv;
  });

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

  const spy = jest.spyOn(global.console, 'log');
  const application = 'app-fingerscrossed';
  const channel = 'middleware';
  const message = Symbol('any message');

  it('saves on state because is request with trace ID', async () => {
    const res = new Response();
    const req = new Request('/', {
      headers: {'x-amzn-trace-id': 'trace-id-1'},
    });

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
    const res = new Response();
    const req = new Request('/', {
      headers: {'x-amzn-trace-id': 'trace-id-1'},
    });

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
    const res = new Response();
    const req = new Request('/');

    await logger.debug({
      req,
      res,
      application,
      channel,
      message,
      metrics: {time_taken_micros: 3},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(JSON.parse(spy.mock.calls)).metrics.time_taken_micros).toBe(3);

    spy.mockClear();
  });

  it('outputs immediately because is a custom error without request', async () => {
    await logger.info({
      application,
      message: 'any message',
      metrics: {time_taken_micros: 4},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls).metrics.time_taken_micros).toBe(4);

    spy.mockClear();
  });

  it('saves on state because is a request with trace ID', async () => {
    const res = new Response();
    const req = new Request('/', {
      headers: {'x-amzn-trace-id': 'trace-id-1'},
    });

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
    const res = new Response();
    const req = new Request('/', {
      headers: {'x-amzn-trace-id': 'trace-id-1'},
    });

    await logger.error({
      req,
      res,
      application,
      message,
      metrics: {time_taken_micros: 6},
    });

    expect(spy.mock.calls.length).toBe(4);
    expect(JSON.parse(JSON.parse(spy.mock.calls[0])).metrics.time_taken_micros).toBe(1);
    expect(JSON.parse(JSON.parse(spy.mock.calls[1])).metrics.time_taken_micros).toBe(2);
    expect(JSON.parse(JSON.parse(spy.mock.calls[2])).metrics.time_taken_micros).toBe(5);
    expect(JSON.parse(JSON.parse(spy.mock.calls[3])).metrics.time_taken_micros).toBe(6);

    spy.mockClear();
  });

  it('saves on state because is a request with trace ID', async () => {
    const res = new Response();
    const req = new Request('/', {
      headers: {'x-amzn-trace-id': 'trace-id-2'},
    });

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
    const res = new Response();
    const req = new Request('/');

    await logger.debug({
      req,
      res,
      application,
      message,
      metrics: {time_taken_micros: 8},
    });

    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(JSON.parse(spy.mock.calls[0])).metrics.time_taken_micros).toBe(8);
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
    const res = new Response();
    const req = new Request('/', {
      headers: {'x-amzn-trace-id': 'trace-id-2'},
    });

    await logger.error({
      req,
      res,
      application,
      message,
      metrics: {time_taken_micros: 10},
    });

    expect(spy.mock.calls.length).toBe(2);
    expect(JSON.parse(JSON.parse(spy.mock.calls[0])).metrics.time_taken_micros).toBe(7);
    expect(JSON.parse(JSON.parse(spy.mock.calls[1])).metrics.time_taken_micros).toBe(10);

    spy.mockClear();
  });
});
