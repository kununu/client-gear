import getDomain from '../../express-helpers/getDomain';

const referrerCookie = 'referrer';

export const getReferrerCookie = () => referrerCookie;

export default () => (req, res, next) => {
  if (req.query.rfr) {
    res.cookie(referrerCookie, req.query.rfr, {
      domain: getDomain(req),
      secure: true,
      httpOnly: false,
      overwrite: true,
    });
  }

  next();
};
