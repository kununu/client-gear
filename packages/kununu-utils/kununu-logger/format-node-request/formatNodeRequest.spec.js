import {Request} from 'jest-express/lib/request'; // eslint-disable-line import/no-extraneous-dependencies
import {Response} from 'jest-express/lib/response'; // eslint-disable-line import/no-extraneous-dependencies
import {advanceTo, clear} from 'jest-date-mock'; // eslint-disable-line import/no-extraneous-dependencies

import formatNodeRequest from './index';

let nodeEnv;

const application = 'app-formatnoderequest';
const channel = 'custom_channel';
const context = {any_context: 'any_context_result'};
const level = 'info';
const message = 'test';
const metrics = {any_metric: 'any_metric_result'};

beforeAll(() => {
  advanceTo(new Date(2019, 1, 1, 0, 0, 0));
  process.env.HOSTNAME = 'dummy-hostname-id';
});

beforeEach(() => {
  nodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
});

afterEach(() => {
  process.env.NODE_ENV = nodeEnv;
});

afterAll(() => {
  clear();
  process.env.HOSTNAME = undefined;
});

describe('formatNodeRequest custom format', () => {
  let req;
  let res;

  beforeEach(() => {
    req = new Request();
    res = new Response();

    req.setOriginalUrl('/url');
    req.setHeaders({
      referer: '/referer',
      'user-agent': 'format-node-request 1.0',
      'x-amzn-trace-id': 'trace-id-1',
      'x-forwarded-for': '0.0.0.0',
    });

    res.status(200);
  });

  afterEach(() => {
    req.resetMocked();
    res.resetMocked();
  });

  it.skip('formats to development correctly', () => {
    process.env.NODE_ENV = 'development';
    const output = formatNodeRequest({
      req, res, application, channel, context, level, message, metrics,
    });

    expect(output).toEqual('[app-formatnoderequest][2019-02-01T00:00:00.000Z][info][custom_channel]{"message":"test","level":6,"level_name":"INFO","datetime":"2019-02-01T00:00:00.000Z","trace_id":"trace-id-1","application":"app-formatnoderequest","channel":"custom_channel","metrics":{"any_metric":"any_metric_result"},"context":{"any_context":"any_context_result"},"http":{"method":"GET","uri":"/url","remote_ip":"0.0.0.0","referer":"/referer","user_agent":"format-node-request 1.0"}}');
  });

  it('formats to production correctly', () => {
    const output = formatNodeRequest({
      req, res, application, channel, context, level, message, metrics,
    });

    expect(output).toEqual(JSON.stringify({
      message: 'test',
      level: 6,
      level_name: 'INFO',
      datetime: '2019-02-01T00:00:00.000Z',
      trace_id: 'trace-id-1',
      channel: 'custom_channel',
      metrics: {
        any_metric: 'any_metric_result',
      },
      context: {
        any_context: 'any_context_result',
      },
      debugContainerHostname: 'dummy-hostname-id',
      http: {
        method: 'GET',
        referer: '/referer',
        request: '/url',
        user_agent: 'format-node-request 1.0',
      },
    }));
  });

  it('formats log correctly without req and res', () => {
    const output = formatNodeRequest({
      application, channel, context, level, message, metrics,
    });

    expect(output).toEqual(JSON.stringify({
      message: 'test',
      level: 6,
      level_name: 'INFO',
      datetime: '2019-02-01T00:00:00.000Z',
      channel: 'custom_channel',
      metrics: {
        any_metric: 'any_metric_result',
      },
      context: {
        any_context: 'any_context_result',
      },
      debugContainerHostname: 'dummy-hostname-id',
    }));
  });

  it('returns correct log format with minimal information', () => {
    const output = formatNodeRequest({
      message, application, level: 'inFO', metrics, context,
    });

    expect(output).toEqual(JSON.stringify({
      message: 'test',
      level: 6,
      level_name: 'INFO',
      datetime: '2019-02-01T00:00:00.000Z',
      channel: 'app',
      metrics: {
        any_metric: 'any_metric_result',
      },
      context: {
        any_context: 'any_context_result',
      },
      debugContainerHostname: 'dummy-hostname-id',
    }));
  });

  it('returns correct log format with missing critical information', () => {
    const output = formatNodeRequest({message});

    expect(output).toEqual(JSON.stringify({
      message: 'test',
      level: false,
      datetime: '2019-02-01T00:00:00.000Z',
      channel: 'app',
      debugContainerHostname: 'dummy-hostname-id',
    }));
  });
});
