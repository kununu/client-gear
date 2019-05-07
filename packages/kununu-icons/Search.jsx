import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 17"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M15.704 15.133l-3.061-3.061a7.245 7.245 0 0 0 1.85-4.825C14.493 3.25 11.242 0 7.247 0 3.25 0 0 3.251 0 7.247c0 3.995 3.251 7.246 7.247 7.246a7.225 7.225 0 0 0 3.839-1.107l3.182 3.183c.19.19.45.294.71.294.259 0 .518-.104.708-.294a.998.998 0 0 0 .018-1.436zM2.024 7.247a5.23 5.23 0 0 1 5.223-5.223c2.888 0 5.205 2.352 5.205 5.223 0 2.87-2.334 5.223-5.205 5.223a5.23 5.23 0 0 1-5.223-5.223z" />
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
