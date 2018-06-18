import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 475 512"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M475.428 184.857c0 5.143-3.714 10-7.428 13.714l-103.714 101.143 24.572 142.857c0.286 2 0.286 3.714 0.286 5.714 0 7.428-3.428 14.286-11.714 14.286-4 0-8-1.428-11.428-3.428l-128.286-67.428-128.286 67.428c-3.715 2-7.428 3.428-11.428 3.428-8.285 0-12-6.857-12-14.286 0-2 0.285-3.714 0.572-5.714l24.572-142.857-104-101.143c-3.429-3.714-7.143-8.571-7.143-13.714 0-8.571 8.857-12 16-13.143l143.428-20.857 64.286-130c2.571-5.428 7.428-11.714 14-11.714s11.428 6.286 14 11.714l64.286 130 143.429 20.857c6.857 1.143 16 4.572 16 13.143z" />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  ariaHidden: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
  ariaHidden: false,
};

export default Icon;
