module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'dentity-obj-proxy'
  },
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  transformIgnorePatterns: [
    'client-gear/node_modules'
  ],
  moduleDirectories: [
    'packages',
    'node_modules'
  ],
  setupTestFrameworkScriptFile: './config/jest/setupTests.js',
  setupFiles: [
    'jest-localstorage-mock'
  ],
  testURL: 'https://www.kununu.com'
};