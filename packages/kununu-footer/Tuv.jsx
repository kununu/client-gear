import React from 'react';
import PropTypes from 'prop-types';

const assetsPath = 'https://assets.kununu.com/images/footer';

const Tuv = ({className}) => (
  <div className={className}>
    <img src={`${assetsPath}/tuv.svg`} alt="TUV Logo" />
  </div>
);

Tuv.propTypes = {className: PropTypes.string};

Tuv.defaultProps = {className: ''};

export default Tuv;
