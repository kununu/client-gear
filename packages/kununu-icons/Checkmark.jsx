import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" />
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
