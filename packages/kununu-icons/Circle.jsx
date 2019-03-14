import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 439 512"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M438.857 256c0 121.143-98.286 219.428-219.429 219.428s-219.429-98.286-219.429-219.429 98.285-219.429 219.429-219.429 219.429 98.286 219.429 219.429z" />
  </svg>
);

Icon.propTypes = {
  ariaHidden: PropTypes.bool,
  className: PropTypes.string,
};

Icon.defaultProps = {
  ariaHidden: undefined,
  className: undefined,
};

export default Icon;
