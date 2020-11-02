import cookies from '../cookies';

import checkKununuSession from './index';

describe('checkKununuSession', () => {
  it('sets kununu session cookie if none exists', () => {
    expect(cookies.get('kununu_session_id')).toBe('');
    checkKununuSession();
    expect(cookies.get('kununu_session_id')).toBeDefined();
  });

  it('keeps kununu session cookie if it exists', () => {
    checkKununuSession();
    const cookie = cookies.get('kununu_session_id');

    checkKununuSession();
    expect(cookies.get('kununu_session_id')).toBe(cookie);
  });
});
