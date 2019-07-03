const isDisabled = require('../isDisabled');

const getConfig = require('./index');

jest.mock('../isDisabled', () => jest.fn());

fdescribe('newRelic getConfig', () => {
  beforeEach(() => {
    isDisabled.mockClear();
  });

  it('returns the config including the supplied license id', () => {
    isDisabled.mockImplementation(() => false);
    expect(getConfig('test_service', 'mylicensekey')).toMatchSnapshot();
  });

  it('returns the config without license id, if newRelic is disabled', () => {
    isDisabled.mockImplementation(() => true);
    expect(getConfig('test_service', 'mylicensekey')).toMatchSnapshot();
  });
});
