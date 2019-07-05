const isEnabled = require('../isEnabled');

const getScript = require('./index');

jest.mock('../isEnabled', () => jest.fn());

describe('newRelic getScript', () => {
  let installKey;
  let serviceName;

  beforeAll(() => {
    installKey = process.env.NR_BROWSER_KEY;
    serviceName = process.env.NR_BROWSER_APP_ID;
    process.env.NR_BROWSER_KEY = 'licensekey';
    process.env.NR_BROWSER_APP_ID = 'applicationid';
  });

  afterAll(() => {
    process.env.NR_BROWSER_KEY = installKey;
    process.env.NR_BROWSER_APP_ID = serviceName;
  });

  beforeEach(() => {
    isEnabled.mockClear();
  });

  it('returns the script including the supplied licensekey and applicationID', () => {
    isEnabled.mockImplementation(() => true);
    expect(getScript()).toMatchSnapshot();
  });

  it('returns the config without license id, if newRelic is disabled', () => {
    isEnabled.mockImplementation(() => false);
    expect(getScript()).toMatchSnapshot();
  });
});
