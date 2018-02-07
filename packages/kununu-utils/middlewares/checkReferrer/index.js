import getDomain from '../../express-helpers/getDomain';

const referrerCookie = 'referrer';

export default () => (req, res, next) => {
  if (req.query.rfr) {
    res.cookie(referrerCookie, req.query.rfr, {
      domain: getDomain(req),
      secure: true,
      httpOnly: true,
      overwrite: true,
    });
  }

  next();
};
