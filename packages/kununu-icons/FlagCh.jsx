import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 16"
    className={className}
    aria-hidden={ariaHidden}
  >
    <rect
      style={{fill: '#FF0000'}}
      x="0"
      y="0"
      width="22"
      height="16"
    />
    <polygon
      style={{fill: '#FFFFFF'}}
      points="6,6 9.1,6 9.1,3 12.9,3 12.9,6 16,6 16,9.8 12.9,9.8 12.9,13 9.1,13 9.1,9.8 6,9.8"
    />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
