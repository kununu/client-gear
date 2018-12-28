import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M256,474.843732 C134.913465,474.843732 37.1562683,377.086535 37.1562683,256 C37.1562683,134.913465 134.913465,37.1562683 256,37.1562683 C377.086535,37.1562683 474.843732,134.913465 474.843732,256 C474.843732,377.086535 377.086535,474.843732 256,474.843732 L256,474.843732 Z M256,0 C114.997613,0 0,115.043741 0,256 C0,397.002387 114.997613,512 256,512 C397.002387,512 512,396.944727 512,256 C512,114.997613 397.002387,0 256,0 L256,0 Z M361.495202,155.682688 L202.399027,314.836524 L131.488445,243.937475 C124.557683,237.006712 112.483625,237.006712 105.541331,243.937475 C98.610568,250.879769 98.610568,262.942295 105.541331,269.884589 L189.42547,353.757196 C192.885085,357.228344 197.209604,358.935087 202.399027,358.935087 C207.576918,358.935087 211.901437,357.228344 215.372584,353.757196 L387.488445,181.629803 C394.43074,174.687508 394.43074,162.613451 387.488445,155.682688 C380.557683,148.740394 369.290869,148.740394 361.495202,155.682688 L361.495202,155.682688 Z" />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  ariaHidden: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;