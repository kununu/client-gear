import React from 'react';
import PropTypes from 'prop-types';

const Tuv = ({className, assetsPath}) => (
  <div className={className}>
    <img
      src={`${assetsPath}/tuv.svg`}
      alt="TUV Logo"
    />
  </div>
);

Tuv.propTypes = {
  className: PropTypes.string,
  assetsPath: PropTypes.string.isRequired,
};

Tuv.defaultProps = {className: ''};

export default Tuv;
