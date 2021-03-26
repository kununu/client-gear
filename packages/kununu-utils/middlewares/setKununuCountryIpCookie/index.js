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

const setKununuCountryIpCookie = (req, res, next) => {
  if (!req.cookies[cookieName]) {
    const country = getCountryFromIp(req);

    res.cookie(cookieName, country, cookieOptions);
  }

  return next();
};

export default setKununuCountryIpCookie;
