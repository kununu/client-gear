import geoip from 'geoip-lite';

const defaultLocale = 'de';
const cookieName = 'kununu_country_ip';
const cookieOptions = {
  httpOnly: false,
  maxAge: 3600000,
  overwrite: true,
  path: '/',
  secure: true,
};

const getCountryFromIp = (req) => {
  const requestIp = ((req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress).split(':').pop();
  const geo = geoip.lookup(requestIp);

  return (geo && geo.country.toLowerCase()) || defaultLocale;
};

const getDomain = (req) => {
  const domain = req.get('x-forwarded-host') || req.get('host') || 'www.kununu.com';

  let countryDomain = domain.replace('www', '');

  if (countryDomain !== '.dev.kununu.it') {
    countryDomain = '.kununu.com';
  }

  return countryDomain;
};

const setKununuCountryIpCookie = (req, res, next) => {
  if (!req.cookies[cookieName]) {
    const country = getCountryFromIp(req);
    const domain = getDomain(req);

    res.cookie(cookieName, country, {...cookieOptions, domain});
  }

  return next();
};

export default setKununuCountryIpCookie;
