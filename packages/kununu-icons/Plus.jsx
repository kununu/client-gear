import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
  >
    <path d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z" />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
