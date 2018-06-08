import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 16"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path
      style={{fill: '#FE0000'}}
      d="M0,5.3c7.3,0,14.7,0,22,0c0,1.8,0,3.6,0,5.3c-7.3,0-14.7,0-22,0C0,8.9,0,7.1,0,5.3z"
    />
    <path
      style={{fill: '#FECB00'}}
      d="M0,10.7c7.3,0,14.7,0,22,0c0,1.8,0,3.6,0,5.3c-7.3,0-14.7,0-22,0C0,14.2,0,12.4,0,10.7z"
    />
    <path d="M0,0c7.3,0,14.7,0,22,0c0,1.8,0,3.6,0,5.3c-7.3,0-14.7,0-22,0C0,3.6,0,1.8,0,0z" />
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
