const cookies = require('@kununu/kununu-utils/dist/kununu-helpers/cookies').default;

const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
};
const COOKIE_NAME = 'kununu_x_lang';

function setLanguageCookieOnBrowser (value) {
  cookies.set(COOKIE_NAME, value, COOKIE_OPTIONS);
}

function setLanguageCookieOnResponse (value, response) {
  response.cookie(COOKIE_NAME, value, COOKIE_OPTIONS);
}

function getLanguageCookie () {
  return cookies.get(COOKIE_NAME);
}

module.exports = {
  setLanguageCookieOnBrowser,
  setLanguageCookieOnResponse,
  getLanguageCookie,
};
