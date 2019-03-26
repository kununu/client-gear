require('isomorphic-fetch');
const jwtDecode = require('jwt-decode');

const {logger} = require('../../kununu-logger');


/**
 * Middleware to refresh cookie, before following requests are happening
 */
function refreshAuthCookie (application) {
  const accessTokenCookieKey = 'kununu_access_token_v1';
  const allowedHeaders = [
    'x-amzn-trace-id',
    'x-forwarded-for',
    'x-forwarded-host',
    'x-forwarded-port',
    'x-forwarded-proto',
    'x-forwarded-server',
    'user-agent',
    'referer',
    'origin',
  ];

  const httpHeaderFilter = (headers, additionalAllowed = []) => Object.keys(headers)
    .filter(key => allowedHeaders
      .concat(additionalAllowed)
      .includes(key))
    .reduce((obj, key) => ({
      ...obj,
      [key]: headers[key],
    }), {});

  /**
   * Decodes jwt access token of authentication cookie
   *
   * @param {Object} cookie
   * @param {string} cookie.access_token
   * @return {boolean|Object}
   */
  function getDecodedCookieAccessToken (cookie) {
    try {
      return jwtDecode(cookie.access_token);
    } catch (exception) {
      logger.error({
        exception,
        message: 'Error parsing auth cookie',
        application,
      });
      return false;
    }
  }

  /**
   * Check if request contains an authentication cookie and return cookie
   *
   * @param {Object} req
   * @param {Object} req.updateAccessTokenCookieForRequest
   * @return {boolean|Object}
   */
  function getAccessTokenBy (req) {
    if (req.cookies && req.cookies[accessTokenCookieKey]) return getDecodedCookieAccessToken(JSON.parse(req.cookies[accessTokenCookieKey]));

    return false;
  }

  /**
   * Check if token is already expired or about to expire
   *
   * @param {number} expiration
   * @return {boolean}
   */
  function isTokenExpired (expiration) {
    const refreshOffset = 300;
    const currentDate = new Date().getTime() / 1000;

    return currentDate > (expiration - refreshOffset);
  }

  /**
   * Decodes a stringified cookie to an object
   * kununu_access_token_v1=tokenvalue; Max-Age=2592000; Domain=www.dev.kununu.it; Path=/; Expires=Thu, 07 Jun 2018 11:51:34 GMT; HttpOnly
   *
   * @param {string} cookie
   * @return {object}
   */
  function getDecodedToken (cookie) {
    const cookieParts = cookie.split(';');
    const tokenCookieParts = cookieParts[0].split('=');

    return decodeURIComponent(tokenCookieParts[1]);
  }

  /**
   * sets request cookies for subsequent fetch calls
   *
   * @param {Object} req
   * @param {string} newAuthCookie
   */
  function updateAccessTokenCookieForRequest (req, newAuthCookie) {
    req.cookies[accessTokenCookieKey] = getDecodedToken(newAuthCookie); // eslint-disable-line no-param-reassign

    // Request cookie object is a long string with semicolon and space separated cookies
    req.headers.cookie = Object.keys(req.cookies) // eslint-disable-line no-param-reassign
      .reduce((acc, key) => [
        ...acc,
        `${key}=${encodeURIComponent(req.cookies[key])}`,
      ], []).join('; ');
  }

  /**
   * Check if supplied request came from a resource route
   * (js bundles, images, stylesheets), and if the token is
   * already expired
   *
   * @param {boolean} isResourceRoute
   * @param {boolean} isExpired
   */
  function shouldNotRefreshToken (isResourceRoute, isExpired) {
    return isResourceRoute || !isExpired;
  }

  return (req, res, next) => {
    // Check if request has an access token cookie
    const accessToken = getAccessTokenBy(req);

    const isResourceRoute = req.url.includes('/js');

    const isExpired = accessToken && isTokenExpired(accessToken.exp);

    if (!accessToken || shouldNotRefreshToken(isResourceRoute, isExpired)) {
      next();
    } else {
      /**
       * Add cookie header, but remove x-forwarded-host.
       * Otherwise ambassador would get "x-forwarded-host": "www.kununu.com, www.kununu.com"
       */
      fetch(`${process.env.BFF_URL}/middlewares2/auth/refresh-token`, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...httpHeaderFilter(req.headers, ['cookie']),
        },
      })
        .then((response) => {
          const newAccessTokenCookie = response.headers.get('set-cookie');

          // update request object cookies for subsequent fetch requests
          updateAccessTokenCookieForRequest(req, newAccessTokenCookie);

          // Set response cookie with same value we got from ambassador
          res.setHeader('set-cookie', newAccessTokenCookie);
          next();
        });
    }
  };
}

module.exports = refreshAuthCookie;
