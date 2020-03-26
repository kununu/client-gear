const isEnabled = require('../isEnabled');

const getConfig = require('./index');

jest.mock('../isEnabled', () => jest.fn());

describe('newRelic getConfig', () => {
  let installKey;
  let applicationName;

  beforeAll(() => {
    installKey = process.env.NR_INSTALL_KEY;
    applicationName = process.env.NR_APPLICATION_NAME;
    process.env.NR_INSTALL_KEY = 'mylicensekey';
    process.env.NR_APPLICATION_NAME = 'test_service;test_service_group';
  });

  afterAll(() => {
    process.env.NR_INSTALL_KEY = installKey;
    process.env.NR_APPLICATION_NAME = applicationName;
  });

  beforeEach(() => {
    isEnabled.mockClear();
  });

  it('returns the config including the supplied license id', () => {
    isEnabled.mockImplementation(() => true);
    expect(getConfig()).toMatchSnapshot();
  });

  it('returns the config without license id, if newRelic is disabled', () => {
    isEnabled.mockImplementation(() => false);
    expect(getConfig()).toMatchSnapshot();
  });
});
