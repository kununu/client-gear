import addServerTimingHeader from './addServerTimingHeader';

const onHeaders = require('on-headers');

export default label => (req, res, next) => {
  /* eslint-disable no-param-reassign */
  const startTime = Date.now();

  function addServerTimingHeaderListener () {
    addServerTimingHeader(this, label, startTime, req.originalUrl);
  }

  onHeaders(res, addServerTimingHeaderListener);

  next();
};
