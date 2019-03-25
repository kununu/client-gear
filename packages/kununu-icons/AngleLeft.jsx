import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 192 512"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M179.143 155.429c0 2.286-1.143 4.857-2.857 6.571l-112.285 112.286 112.285 112.286c1.714 1.714 2.857 4.286 2.857 6.572s-1.143 4.857-2.857 6.572l-14.286 14.286c-1.714 1.714-4.286 2.857-6.572 2.857s-4.857-1.143-6.572-2.857l-133.143-133.143c-1.714-1.714-2.857-4.286-2.857-6.572s1.143-4.857 2.857-6.572l133.143-133.143c1.714-1.714 4.286-2.857 6.572-2.857s4.857 1.143 6.572 2.857l14.286 14.286c1.714 1.714 2.857 4 2.857 6.571z" />
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
