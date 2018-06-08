import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 16"
    className={className}
  >
    <g>
      <rect x="0" y="0" style={{fill: '#ED2939'}} width="22" height="5.3" />
      <rect x="0" y="10.7" style={{fill: '#ED2939'}} width="22" height="5.3" />
      <rect x="0" y="5.3" style={{fill: '#FFFFFF'}} width="22" height="5.3" />
    </g>
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;