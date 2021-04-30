import cookies from '../kununu-helpers/cookies';

const ONE_WEEK_IN_MILLISECONDS = 60 * 60 * 24 * 7;

const COOKIE_OPTIONS = {
  maxAge: ONE_WEEK_IN_MILLISECONDS,
  path: '/',
};
const COOKIE_NAME = 'kununu_x_lang';

export const languageCookie = {
  browser: {
    set: (value) => {
      cookies.set(COOKIE_NAME, value, COOKIE_OPTIONS);
    },
    get: () => cookies.get(COOKIE_NAME),
  },
  server: {
    set: (response, value) => {
      response.cookie(COOKIE_NAME, value, COOKIE_OPTIONS);
    },
    get: request => request.cookies[COOKIE_NAME],
  },
};

export default languageCookie;
