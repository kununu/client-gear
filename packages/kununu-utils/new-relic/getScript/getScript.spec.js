const isDisabled = require('../isDisabled');

const getScript = require('./index');

jest.mock('../isDisabled', () => jest.fn());

fdescribe('newRelic getScript', () => {
  beforeEach(() => {
    isDisabled.mockClear();
  });

  it('returns the script including the supplied licensekey and applicationID', () => {
    isDisabled.mockImplementation(() => false);
    expect(getScript('licensekey', 'applicationid')).toMatchSnapshot();
  });

  it('returns the config without license id, if newRelic is disabled', () => {
    isDisabled.mockImplementation(() => true);
    expect(getScript('licensekey', 'applicationod')).toMatchSnapshot();
  });
});
