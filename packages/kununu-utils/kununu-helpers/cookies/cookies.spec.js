import cookies from './index';

describe('cookies', () => {
  it('sets cookie by providing name and value', () => {
    cookies.set('_ga', 'GA1.3.1104711686.1534856314');
    expect(cookies.get('_ga')).toEqual('GA1.3.1104711686.1534856314');
  });

  it('sets cookie by providing name, value and options object', () => {
    cookies.set('kununu_country_ip', 'at', {});
    cookies.set('kununu_country', 'de', {
      domain: '.kununu.com',
      path: '/',
      maxAge: 10000,
    });

    expect(cookies.get('kununu_country_ip')).toEqual('at');
    expect(cookies.get('kununu_country')).toEqual('de');
  });

  it('can sucessfully save a cookie when its given value is an unparsed object', () => {
    const cookieName = 'kununu_cookie_name';
    const cookieValue = {valueA: 1, valueB: 2};
    cookies.set(cookieName, cookieValue, {});

    expect(cookies.get(cookieName)).toEqual(cookieValue);
  });
});
