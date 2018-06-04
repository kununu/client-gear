import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 174 512"
    className={className}
  >
  <title>angle-right</title>
    <path d="M170 274.286c0 2.286-1.143 4.857-2.857 6.572l-133.143 133.143c-1.715 1.714-4.285 2.857-6.572 2.857s-4.857-1.143-6.572-2.857l-14.286-14.286c-1.715-1.714-2.857-4-2.857-6.572 0-2.286 1.143-4.857 2.857-6.572l112.285-112.286-112.285-112.286c-1.715-1.714-2.857-4.286-2.857-6.572s1.143-4.857 2.857-6.572l14.285-14.286c1.715-1.714 4.285-2.857 6.572-2.857s4.857 1.143 6.572 2.857l133.143 133.143c1.714 1.714 2.857 4.286 2.857 6.572z"></path>
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
