import getDomain from '../getDomain';

import filterDomain from './index';

const request = require('supertest');
const express = require('express');

fdescribe('Returns current domain from a request object', () => {
  const app = express();

  app.get('/', (req, res) => {
    res.json({domain: filterDomain(getDomain(req))});
  });

  it('returns the x-forwarded-host, when one is set', async () => {
    const domain = 'www.domain.test';

    const result = await request(app)
      .get('/')
      .set('x-forwarded-host', domain);

    expect(result.body.domain).toEqual(domain);
  });

  it('returns the first domain, when multiple domains are in x-forwarded-host', async () => {
    const domain = 'www.domain.test';
    const secondDomain = 'www.anotherdomain.test';

    const result = await request(app)
      .get('/')
      .set('x-forwarded-host', `${domain}, ${secondDomain}`);

    expect(result.body.domain).toEqual(domain);
  });
});
