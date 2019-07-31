import getDomain from '../../express-helpers/getDomain';

const referrerCookie = 'referrer';
const sourceCookie = 'source';

export const getReferrerCookie = () => referrerCookie;
export const getSourceCookie = () => sourceCookie;

export default () => (req, res, next) => {
  if (req.query.rfr) {
    res.cookie(referrerCookie, req.query.rfr, {
      domain: getDomain(req),
      secure: true,
      httpOnly: false,
      overwrite: true,
    });

    // Setting the newer 2019 source cookie as well, maybe at some point we can turn off the referrer cookie
    res.cookie(sourceCookie, req.query.rfr, {
      domain: getDomain(req),
      secure: true,
      httpOnly: false,
      overwrite: true,
    });
  }

  next();
};
