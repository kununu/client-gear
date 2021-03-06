import {serialize} from 'cookie';

const cookies = {
  get: name => document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    const cookie = parts[0] === name ? decodeURIComponent(parts[1]) : r;
    const shouldBeParsed = cookie[0] === '{' || cookie[0] === '[';

    return shouldBeParsed ? JSON.parse(cookie) : cookie;
  }, ''),
  set: (name, value, options) => {
    // allow you to work with cookies as objects.
    if (typeof value === 'object') {
      value = JSON.stringify(value); // eslint-disable-line no-param-reassign
    }

    document.cookie = serialize(name, value, options);
  },
};

export default cookies;
