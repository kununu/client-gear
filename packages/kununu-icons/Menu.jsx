import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 398"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M28 0h456a28 28 0 0 1 0 57H28a28 28 0 0 1 0-57zm0 171h456a28 28 0 0 1 0 56H28a28 28 0 1 1 0-56zm0 170h456a28 28 0 0 1 0 57H28a28 28 0 1 1 0-57z" />
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
