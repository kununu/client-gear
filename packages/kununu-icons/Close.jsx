import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M255.646753,210.391919 L97.254834,52 L52,97.254834 L210.391919,255.646753 L52,414.038672 L97.254834,459.293506 L255.646753,300.901587 L414.038672,459.293506 L459.293506,414.038672 L300.901587,255.646753 L459.293506,97.254834 L414.038672,52 L255.646753,210.391919 L255.646753,210.391919 Z" />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
