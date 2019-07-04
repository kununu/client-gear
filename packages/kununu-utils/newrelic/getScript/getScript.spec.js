const isDisabled = require('../isDisabled');

const getScript = require('./index');

jest.mock('../isDisabled', () => jest.fn());

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
    isDisabled.mockClear();
  });

  it('returns the script including the supplied licensekey and applicationID', () => {
    isDisabled.mockImplementation(() => false);
    expect(getScript()).toMatchSnapshot();
  });

  it('returns the config without license id, if newRelic is disabled', () => {
    isDisabled.mockImplementation(() => true);
    expect(getScript()).toMatchSnapshot();
  });
});
