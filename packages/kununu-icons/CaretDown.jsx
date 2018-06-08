import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 293 512"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M292.572 201.143c0 4.857-2 9.429-5.428 12.857l-128 128c-3.429 3.428-8 5.428-12.857 5.428s-9.429-2-12.857-5.428l-128-128c-3.429-3.429-5.428-8-5.428-12.857 0-10 8.286-18.285 18.285-18.285h256c10 0 18.286 8.286 18.286 18.286z" />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  ariaHidden: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  ariaHidden: '',
};

export default Icon;
