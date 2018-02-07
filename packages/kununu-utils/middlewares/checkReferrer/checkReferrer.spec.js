const express = require('express');
const request = require('supertest');
const cookieParser = require('cookie-parser');

const checkReferrer = require('./index').default;

describe('Middleware checkReferrer', () => {
  const app = express();
  app.use(cookieParser());
  app.use(checkReferrer());
  app.get('/', (req, res) => {
    res.send();
  });

  it('sets a referrer cookie, when one is set as a query param', async () => {
    const rfr = 'testrfr';
    const domain = 'www.domain.test';

    const expectedCookie = `referrer=${rfr}; Domain=${domain}; Path=/; HttpOnly; Secure`;

    const result = await request(app)
      .get(`/?rfr=${rfr}`)
      .set('x-forwarded-host', domain);

    expect(result.headers['set-cookie'][0]).toEqual(expectedCookie);
  });

  it('does not set a referrer cookie, when none is provided', async () => {
    const result = await request(app)
      .get('/');

    expect(result.headers['set-cookie']).toBe(undefined);
  });
});
