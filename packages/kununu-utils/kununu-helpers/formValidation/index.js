export const EMPTY = 'EMPTY';
export const TOO_SHORT = 'TOO_SHORT';
export const NOT_VALID = 'NOT_VALID';

/**
 * Validates if a string is empty
 * @author Daniel Stein
 * @param {string} value [of input field]
 */
export function notEmpty (value) {
  if (!value) {
    return EMPTY;
  }

  return undefined;
}

/**
 * Validates if a value has a specified minimum length
 * @author Daniel Stein
 * @param {string} value [of input field]
 * @param {number} length
 */
function minLength (value, length) {
  if (value.trim().length < length) {
    return TOO_SHORT;
  }

  return undefined;
}

/**
 * Validates if a value has a minimum of 10 characters
 * @author Daniel Stein
 * @param {string} value [of input field]
 */
export const minLength10 = (value) => minLength(value, 10);

// Regex from https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function isEmail (value) {
  if (!emailPattern.test(value)) {
    return NOT_VALID;
  }

  return undefined;
}

export const validationTypes = {
  isEmpty: 'isEmpty',
  minLength: 'minLength',
  isEmail: 'isEmail',
};

/**
 * Checks a given value for each validator in a validations array
 *
 * @param {string} value
 * @param {Array} validations
 */
export function validateField (value, validations) {
  return validations.reduce((acc, validation) => {
    if (acc) return acc; // Always return error message

    switch (validation.type) {
      case validationTypes.isEmpty:
        if (notEmpty(value) !== undefined) return validation.message;
        break;
      case validationTypes.minLength:
        if (minLength(value, validation.minLength)) return validation.message;
        break;
      case validationTypes.isEmail:
        if (isEmail(value) !== undefined) return validation.message;
        break;
      default:
        break;
    }
    return false;
  }, false);
}
