import cookies from '../cookies';

import checkKununuSession from './index';

describe('checkKununuSession', () => {
  it('sets kununu session cookie if none exists', () => {
    checkKununuSession();
    expect(cookies.get('kununu_session_id')).toBeDefined();
  });
});
