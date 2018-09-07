const cookies = {
  get: name => document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    const cookie = parts[0] === name ? decodeURIComponent(parts[1]) : r;
    const shouldBeParsed = cookie[0] === '{' || cookie[0] === '[';
    return shouldBeParsed ? JSON.parse(cookie) : cookie;
  }, ''),
  set: (name, value, options) => {
    const parsedOptions = typeof options === 'object' ?
      Object.keys(options).map(key => `${key}=${options[key]}`).join('; ') :
      null;

    const cookie = parsedOptions === null ?
      `${name}=${value}; ` :
      `${name}=${value}; ${parsedOptions}`;

    document.cookie = cookie;
  },
};

export default cookies;
