import {advanceTo, clear} from 'jest-date-mock'; // eslint-disable-line import/no-extraneous-dependencies

let log;
let nodeEnv;
const minimumLogLevelEnv = process.env.MINIMUM_LOG_LEVEL;

const spyFunc = jest.fn((val) => {
  log = JSON.parse(val.slice(val.indexOf('{')));
});

beforeAll(() => {
  advanceTo(new Date(2019, 1, 1, 0, 0, 0));

  global.console = {log: spyFunc};

  nodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
});

afterEach(() => {
  spyFunc.mockClear();
  log = {};
});

afterAll(() => {
  process.env.NODE_ENV = nodeEnv;
  clear();
});

describe('according to defined a level', () => {
  jest.resetModules();
  process.env.MINIMUM_LOG_LEVEL = 'debug';

  const {logger: loggerLevelTest} = require('./index'); // eslint-disable-line global-require

  afterAll(() => {
    process.env.MINIMUM_LOG_LEVEL = minimumLogLevelEnv;
  });

  it('tries to log a debug', () => {
    loggerLevelTest.debug({
      message: 'debug message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('DEBUG');
    expect(log.level).toBe(7);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('debug message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log an info', () => {
    loggerLevelTest.info({
      message: 'info message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('INFO');
    expect(log.level).toBe(6);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('info message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log a notice', () => {
    loggerLevelTest.notice({
      message: 'notice message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('NOTICE');
    expect(log.level).toBe(5);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('notice message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log a warning', () => {
    loggerLevelTest.warning({
      message: 'warning message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('WARNING');
    expect(log.level).toBe(4);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('warning message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log an error', () => {
    loggerLevelTest.error({
      message: 'error message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('ERROR');
    expect(log.level).toBe(3);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('error message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log a critical', () => {
    loggerLevelTest.critical({
      message: 'critical message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('CRITICAL');
    expect(log.level).toBe(2);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('critical message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log an alert', () => {
    loggerLevelTest.alert({
      message: 'alert message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('ALERT');
    expect(log.level).toBe(1);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('alert message');
    expect(log.datetime).toBe(new Date().toISOString());
  });

  it('tries to log an emergency', () => {
    loggerLevelTest.emergency({
      message: 'emergency message',
    });

    expect(spyFunc).toBeCalled();
    expect(log.level_name).toBe('EMERGENCY');
    expect(log.level).toBe(0);
    expect(log.channel).toBe('app');
    expect(log.message).toBe('emergency message');
    expect(log.datetime).toBe(new Date().toISOString());
  });
});
