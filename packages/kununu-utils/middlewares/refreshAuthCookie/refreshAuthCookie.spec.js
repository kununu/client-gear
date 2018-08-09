import request from 'supertest';
import express from 'express';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import refreshAuthCookie from '../refreshAuthCookie';

const cookieParser = require('cookie-parser');

const cookieKey = 'kununu_access_token_v1';
const refreshURL = `${process.env.BFF_URL}/middlewares2/auth/refresh-token`;

jest.mock('../../kununu-logger');

/**
 *
 * Creates an object that
 *
 * @param {Object} data
 * @param {data} exp
 * @return string
 */
function getJWTToken (data, exp) {
  const secretKey = 'somesecret';
  return jwt.sign({
    ...data,
    exp,
  }, secretKey);
}

/**
 * Creates an object that can be used as the authorization cookie
 * in tests.
 *
 * @param {Object} data
 * @param {number} expires
 * @return {Object}
 */
function getAuthCookie (data, expires = 400) {
  const accessToken = getJWTToken(data, Math.floor(Date.now() / 1000) + expires);

  const refreshToken = getJWTToken({
    token: 'somerefreshtoken',
  }, Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30));

  return {
    [cookieKey]: {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  };
}

const cookieExpire = getAuthCookie({
  sub: 1,
}, 200);

const cookieLongLiving = getAuthCookie({
  sub: 1,
}, 60 * 60 * 1000);

describe('middlewares', () => {
  const app = express();
  app.use(cookieParser());
  app.use(refreshAuthCookie('app-mykununu'));
  app.get('/someroute', (req, res) => res.send());
  app.get('/app-mykununu/js/resource', (req, res) => res.send());

  afterEach(() => {
    fetchMock.reset();
  });

  describe('refreshAuthCookie', () => {
    it('does not try to refresh the auth cookie, when its not about to expire', async () => {
      const strinigifiedCookie = `${cookieKey}=${encodeURIComponent(JSON.stringify(cookieLongLiving[cookieKey]))}`;
      const result = await request(app)
        .get('/someroute')
        .set('cookie', strinigifiedCookie);

      expect(fetchMock.called()).toEqual(false);
      expect(result.status).toEqual(200);
    });

    it('does not try to refresh the token, when a resource route is called', async () => {
      const strinigifiedCookie = `${cookieKey}=${encodeURIComponent(JSON.stringify(cookieLongLiving[cookieKey]))}`;
      const result = await request(app)
        .get('/app-mykununu/js/resource')
        .set('cookie', strinigifiedCookie);

      expect(fetchMock.called()).toEqual(false);
      expect(result.status).toEqual(200);
    });

    it('calls the refresh-token route, when the auth cookie is about to expire', async () => {
      const strinigifiedCookie = `${cookieKey}=${encodeURIComponent(JSON.stringify(cookieExpire[cookieKey]))}`;

      fetchMock.post(refreshURL, {
        status: 200,
        headers: {
          'set-cookie': `${cookieKey}=newcookie`,
        },
      });

      const result = await request(app)
        .get('/someroute')
        .set('cookie', strinigifiedCookie);

      expect(fetchMock.called()).toEqual(true);
      expect(result.status).toEqual(200);
    });

    it('handles malformed jwt tokens', async () => {
      const malformedStringifiedCookie = `${cookieKey}=${encodeURIComponent(JSON.stringify({
        access_token: 'somemalformedtoken',
      }))}`;
      const result = await request(app)
        .get('/someroute')
        .set('cookie', malformedStringifiedCookie);

      expect(result.status).toEqual(200);
    });

    it('does not fail, when no auth cookie is set', async () => {
      const result = await request(app)
        .get('/someroute')
        .set('cookie', 'othercookie=data');

      expect(result.status).toEqual(200);
    });
  });
});
