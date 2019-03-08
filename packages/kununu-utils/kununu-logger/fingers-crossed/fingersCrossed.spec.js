import {createLogger} from 'winston';
import {Request} from 'jest-express/lib/request';
import {Response} from 'jest-express/lib/response';

import {loggingLevels} from '../config';

import FingersCrossed from './index';

describe('fingersCrossed transport', () => {
  const message = 'test';

  let req;
  let res;
  let spy;
  let logger;

  beforeAll(() => {
    spy = jest.spyOn(global.console, 'log');
  });

  beforeEach(() => {
    req = new Request('/');
    res = new Response();

    logger = createLogger({
      levels: loggingLevels,
      transports: new FingersCrossed({
        level: 'info',
        activationLogLevel: 'error',
      }),
    });
  });

  afterEach(() => {
    spy.mockClear();
    req.resetMocked();
    res.resetMocked();
  });

  it('does not output log if minimum level is not reached', () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-1');

    logger.debug({
      req,
      res,
      message,
    });

    expect(spy.mock.calls.length).toBe(0);
  });

  it('outputs log if message is not provided and minimum level is reached', () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-2');

    logger.info({
      req,
      res,
    });

    expect(spy.mock.calls.length).toBe(1);
  });

  it('does not output log if has trace id and activation level is not reached', () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-3');

    logger.info({
      req,
      res,
      message,
    });

    expect(spy.mock.calls.length).toBe(0);
  });

  it('does not output log if trace id is provided but activation level is not reached', () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-4');

    logger.info({
      req,
      res,
      message,
    });

    expect(spy.mock.calls.length).toBe(0);
  });

  it('outputs log if trace id is not provided but minimum level is reached', () => {
    logger.info({
      req,
      res,
      message,
    });

    expect(spy.mock.calls.length).toBe(1);
  });

  it('outputs log if request is not provided but minimum level is reached', () => {
    logger.info({message: 'test'});

    expect(spy.mock.calls.length).toBe(1);
  });

  it('outputs log if trace id is provided and activation level is reached', () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-4');

    logger.error({
      req,
      res,
      message,
    });

    expect(spy.mock.calls.length).toBe(1);
  });

  it('outputs logs with same trace id when activation level is reached', () => {
    req.setHeaders('x-amzn-trace-id', 'trace-id-1');
    logger.info({req, res, message});
    expect(spy.mock.calls.length).toBe(0);

    req.setHeaders('x-amzn-trace-id', 'trace-id-1');
    logger.debug({req, res, message});
    expect(spy.mock.calls.length).toBe(0);

    req.setHeaders('x-amzn-trace-id', 'trace-id-2');
    logger.info({req, res, message});
    expect(spy.mock.calls.length).toBe(0);

    req.setHeaders('x-amzn-trace-id', 'trace-id-1');
    logger.debug({req, res, message});
    expect(spy.mock.calls.length).toBe(0);

    req.setHeaders('x-amzn-trace-id', 'trace-id-2');
    logger.info({req, res, message});
    expect(spy.mock.calls.length).toBe(0);

    req.setHeaders('x-amzn-trace-id', 'trace-id-2');
    logger.debug({req, res, message});
    expect(spy.mock.calls.length).toBe(0);

    req.setHeaders('x-amzn-trace-id', 'trace-id-1');
    logger.error({req, res, message});
    expect(spy.mock.calls.length).toBe(2);
    spy.mockClear();

    req.setHeaders('x-amzn-trace-id', 'trace-id-1');
    logger.error({req, res, message});
    expect(spy.mock.calls.length).toBe(1);
    spy.mockClear();

    req.setHeaders('x-amzn-trace-id', 'trace-id-2');
    logger.critical({req, res, message});
    expect(spy.mock.calls.length).toBe(3);
    spy.mockClear();
  });
});
