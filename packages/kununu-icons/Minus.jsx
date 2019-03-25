import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z" />
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
