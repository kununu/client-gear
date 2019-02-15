module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  setupFiles: [
    './jest.setup.js',
    'jest-localstorage-mock',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testURL: 'http://www.kununu.com',
  globals: {
    'babel-jest': {
      'babelrcFile': '<rootDir>/babel.config.js'
    }
  },
};
