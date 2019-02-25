/* eslint-disable import/prefer-default-export */
const sanitizeWhitespaceRegex = /\r\n|\r|\n| +/g;

export function sanitizeWhitespace (value) {
  return value.replace(sanitizeWhitespaceRegex, ' ');
}
