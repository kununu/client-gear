import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 293 512"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M292.572 347.428c0 10-8.286 18.286-18.286 18.286h-256c-10 0-18.285-8.286-18.285-18.286 0-4.857 2-9.428 5.428-12.857l128-128c3.429-3.429 8-5.428 12.857-5.428s9.428 2 12.857 5.428l128 128c3.428 3.428 5.428 8 5.428 12.857z" />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  ariaHidden: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
  ariaHidden: false,
};

export default Icon;
