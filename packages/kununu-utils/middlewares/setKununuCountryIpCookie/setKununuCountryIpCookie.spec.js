import {lookup} from 'geoip-lite';

import setKununuCountryIpCookie from '.';

jest.mock('../../kununu-helpers/getCountryFromIp', () => () => 'at');
jest.mock('geoip-lite', () => ({lookup: jest.fn()}));

const req = {
  connection: {remoteAddress: ''},
  cookies: {},
  get: jest.fn(),
  headers: {},
  params: {countryCode: 'at'},
};

const res = {
  cookie: jest.fn(),
};

const next = jest.fn();
const cookieValues = {
  domain: '.kununu.com',
  httpOnly: false,
  maxAge: 3600000,
  overwrite: true,
  path: '/',
  secure: true,
};

describe('setKununuCountryIpCookie', () => {
  beforeEach(() => {
    res.cookie.mockClear();
    next.mockClear();
  });

  it('should not set the kununu_country_ip cookie', () => {
    const reqWithCookie = {
      ...req,
      cookies: {
        kununu_country_ip: 'cookie value',
      },
    };

    setKununuCountryIpCookie(reqWithCookie, res, next);

    expect(res.cookie).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should set the kununu_country_ip cookie with default value', () => {
    setKununuCountryIpCookie(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith('kununu_country_ip', 'de', cookieValues);
    expect(next).toHaveBeenCalled();
  });

  it('should set the kununu_country_ip cookie with country ip', () => {
    lookup.mockReturnValueOnce({country: 'pt'});

    setKununuCountryIpCookie(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith('kununu_country_ip', 'pt', cookieValues);
    expect(next).toHaveBeenCalled();
  });

  it('should not set domain to .kununu.com because it was dev env', () => {
    req.get.mockImplementationOnce(() => 'www.dev.kununu.it');
    setKununuCountryIpCookie(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith('kununu_country_ip', 'de', {
      ...cookieValues,
      domain: '.dev.kununu.it',
    });
    expect(next).toHaveBeenCalled();
  });
});
