import getDomain from './index';

const request = require('supertest');
const express = require('express');

describe('Returns current domain from a request object', () => {
  const app = express();

  app.get('/', (req, res) => {
    res.json({domain: getDomain(req)});
  });

  it('returns the x-forwarded-host, when one is set', async () => {
    const domain = 'www.domain.test';

    const result = await request(app)
      .get('/')
      .set('x-forwarded-host', domain);

    expect(result.body.domain).toEqual(domain);
  });

  it('returns the host, when no x-forwarded-host is set', async () => {
    const domain = 'www.domain.test';
    const result = await request(app)
      .get('/')
      .set('host', domain);

    expect(result.body.domain).toEqual(domain);
  });
});
