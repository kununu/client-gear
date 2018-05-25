import {
    notEmpty,
    minLength10,
    isEmail,
    validateField,
    validationTypes,
} from './index';

describe('formValidation methods', () => {
  it('Returns the correct value', () => {
    expect(notEmpty()).toEqual('EMPTY');
  });

  it('Returns the correct minLength10 when text is too short', () => {
    expect(minLength10('sample')).toEqual('TOO_SHORT');
  });

  it('Returns the correct minLength10 when text is longer than 10 chars', () => {
    expect(minLength10('sample text')).toEqual(undefined);
  });

  it('Returns error when mail is invalid', () => {
    expect(isEmail('not_email')).toEqual('NOT_VALID');
  });
});

describe('validates fields', () => {
  it('Returns false when input is not empty', () => {
    const validations = [{
      type: validationTypes.isEmpty,
      message: 'error',
    }];
    expect(validateField('abc', validations)).toEqual(false);
  });

  it('Returns false when correct input length is valid', () => {
    const validations = [{
      type: validationTypes.minLength,
      message: 'error',
    }];
    expect(validateField('long text', validations)).toEqual(false);
  });

  it('Returns error message when isEmail input is not valid', () => {
    const validations = [{
      type: validationTypes.isEmail,
      message: 'error',
    }];
    expect(validateField('long text', validations)).toEqual('error');
  });
});
