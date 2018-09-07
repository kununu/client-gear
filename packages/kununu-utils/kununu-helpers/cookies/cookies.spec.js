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
  })

  it('can parse json cookie', () => {
    const cookieName = 'kununu_user_info';
    const cookieValue = '%7B%22username%22%3A%22u38894%22%2C%22email%22%3A%22u38894%40kununu.dev%22%7D'
    const expectedParsedObject = {username:"u38894",email:"u38894@kununu.dev"};
    cookies.set(cookieName, cookieValue);

    expect(cookies.get(cookieName)).toEqual(expectedParsedObject);
  })
});
