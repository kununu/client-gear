module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFiles: [
    './jest.setup.js',
    'jest-localstorage-mock',
    'jest-date-mock',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testURL: 'http://www.kununu.com',
  reporters: [
    'default',
    'jest-junit',
  ],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx}',
    '!packages/client-gear-playground/**',
    '!**/dist/**',
  ],
};
