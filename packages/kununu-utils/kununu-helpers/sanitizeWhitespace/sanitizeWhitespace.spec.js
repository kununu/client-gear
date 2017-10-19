import {sanitizeWhitespace} from './index';

describe('Sanitize Whitespace', () => {
  it('replaces two spaces with one space', () => {
    expect(sanitizeWhitespace('ab  cd')).toEqual('ab cd');
  });

  it('replaces a new line character \\n with a space', () => {
    expect(sanitizeWhitespace('ab\ncd')).toEqual('ab cd');
  });

  it('replaces a new line character \\r\\n with a space', () => {
    expect(sanitizeWhitespace('ab\r\ncd')).toEqual('ab cd');
  });

  it('replaces a new line character \\r with a space', () => {
    expect(sanitizeWhitespace('ab\rcd')).toEqual('ab cd');
  });
});
