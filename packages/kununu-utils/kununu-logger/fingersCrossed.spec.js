const {logger} = require('./');

const nodeEnv = process.env.NODE_ENV;
const minimumLogLevelEnv = process.env.MINIMUM_LOG_LEVEL;
const activationLogLevel = process.env.ACTIVATION_LOG_LEVEL;

beforeAll(() => {
  process.env.NODE_ENV = 'production';
  process.env.MINIMUM_LOG_LEVEL = 'debug';
  process.env.ACTIVATION_LOG_LEVEL = 'error';
});

afterAll(() => {
  process.env.NODE_ENV = nodeEnv;
  process.env.MINIMUM_LOG_LEVEL = minimumLogLevelEnv;
  process.env.ACTIVATION_LOG_LEVEL = activationLogLevel;
});

describe.skip('Fingers Crossed transport for kununu-logger', () => {
  const application = 'app';
  const message = 'An error has ocurred';
  const res = {statusCode: 200};
  const req = (traceId = '') => ({
    req: {
      method: 'GET',
      originalUrl: '/',
      connection: {
        remoteAddress: '127.0.0.1',
      },
      headers: {
        referer: '',
        'x-amzn-trace-id': traceId,
        'x-forwarded-for': '',
        'user-agent': '',
      },
    },
  });

  it('logs requests by the rules', async () => {
    const spy = jest.spyOn(global.console, 'log');

    // 1. Should save on state because it's a request with trace ID
    await logger.info({
      ...req('trace-id-1'), res, application, timeTakenMicros: 1,
    });
    expect(spy.mock.calls.length).toBe(0);

    // 2. Should save on state because it's a request with trace ID
    await logger.debug({
      ...req('trace-id-1'), res, application, timeTakenMicros: 2,
    });
    expect(spy.mock.calls.length).toBe(0);

    // 3. Should output immediately because it's a request without trace ID
    await logger.debug({
      ...req(), res, application, timeTakenMicros: 3,
    });
    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls[0]).time_taken_micros).toBe(3);
    spy.mockClear();

    // 4. Should output immediately because it's a custom error without request
    await logger.info({
      application, message, custom: true, timeTakenMicros: 4,
    });
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toContain('"timeTakenMicros":4');
    spy.mockClear();

    // 5. Should save on state because it's a request with trace ID
    await logger.warn({
      ...req('trace-id-1'), res, application, timeTakenMicros: 5,
    });
    expect(spy.mock.calls.length).toBe(0);

    // 6. Should output with logs (1, 2, 5, 6) because it reached activation log level
    await logger.error({
      ...req('trace-id-1'), res, application, timeTakenMicros: 6,
    });
    expect(spy.mock.calls.length).toBe(4);
    expect(JSON.parse(spy.mock.calls[0]).time_taken_micros).toBe(1);
    expect(JSON.parse(spy.mock.calls[1]).time_taken_micros).toBe(2);
    expect(JSON.parse(spy.mock.calls[2]).time_taken_micros).toBe(5);
    expect(JSON.parse(spy.mock.calls[3]).time_taken_micros).toBe(6);
    spy.mockClear();

    // 7. Should save on state because it's a request with trace ID
    await logger.info({
      ...req('trace-id-2'), res, application, timeTakenMicros: 7,
    });
    expect(spy.mock.calls.length).toBe(0);

    // 8. Should output immediately because it's a request without trace ID
    await logger.debug({
      ...req(), res, application, timeTakenMicros: 8,
    });
    expect(spy.mock.calls.length).toBe(1);
    expect(JSON.parse(spy.mock.calls[0]).time_taken_micros).toBe(8);
    spy.mockClear();

    // 9. Should output immediately because it's a custom error without request
    await logger.error({
      application, message, custom: true, timeTakenMicros: 9,
    });
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toContain('"timeTakenMicros":9');
    spy.mockClear();

    // 10. Should output with logs (7, 10) because it reached activation log level
    await logger.error({
      ...req('trace-id-2'), res, application, timeTakenMicros: 10,
    });
    expect(spy.mock.calls.length).toBe(2);
    expect(JSON.parse(spy.mock.calls[0]).time_taken_micros).toBe(7);
    expect(JSON.parse(spy.mock.calls[1]).time_taken_micros).toBe(10);
    spy.mockClear();
  });
});
