const isDisabled = require('../isDisabled');

const getConfig = require('./index');

jest.mock('../isDisabled', () => jest.fn());

describe('newRelic getConfig', () => {
  let installKey;
  let serviceName;

  beforeAll(() => {
    installKey = process.env.NR_INSTALL_KEY;
    serviceName = process.env.SERVICE_NAME;
    process.env.NR_INSTALL_KEY = 'mylicensekey';
    process.env.SERVICE_NAME = 'test_service';
  });

  afterAll(() => {
    process.env.NR_INSTALL_KEY = installKey;
    process.env.SERVICE_NAME = serviceName;
  });

  beforeEach(() => {
    isDisabled.mockClear();
  });

  it('returns the config including the supplied license id', () => {
    isDisabled.mockImplementation(() => false);
    expect(getConfig()).toMatchSnapshot();
  });

  it('returns the config without license id, if newRelic is disabled', () => {
    isDisabled.mockImplementation(() => true);
    expect(getConfig()).toMatchSnapshot();
  });
});
