import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M20.413 22.886h0v1.328l-0.066 4.112c0 0.361-0.299 0.658-0.674 0.658h-4.037c-0.37 0-0.672-0.297-0.672-0.658v-4.112h-0.016v-1.328c0-1.431-1.195-2.595-2.659-2.595h-1.427c-1.467 0-2.658 1.164-2.658 2.595h-0.028v5.441c0 0.361-0.301 0.658-0.674 0.658h-4.039c-0.372 0-0.672-0.297-0.672-0.658v-24.474c0-0.36 0.301-0.658 0.672-0.658h4.039c0.373 0 0.674 0.297 0.674 0.658v11.551c0.842-0.288 1.745-0.448 2.686-0.448h1.366v-0.016c1.469 0 2.66-1.165 2.66-2.593l0.085-1.331c0.055-0.31 0.329-0.546 0.662-0.546h4.037c0.335 0 0.609 0.236 0.664 0.546h0.018v1.331c0 2.005-0.768 3.837-2.030 5.235 1.296 1.408 2.088 3.266 2.088 5.304zM23.444 3.932c-0.168-0.162-0.44-0.162-0.607 0l-0.163 0.159c-0.166 0.163-0.169 0.432-0.003 0.595l0.989 0.964c0.134 0.131 0.127 0.344-0.007 0.473l-0.124 0.123c-0.134 0.129-0.347 0.135-0.479 0.004l-0.991-0.966c-0.511-0.497-0.516-1.302-0.005-1.801l0.163-0.159c0.509-0.497 1.332-0.491 1.842 0.008l0.985 0.962c0.133 0.129 0.133 0.341 0 0.473l-0.125 0.122c-0.133 0.129-0.356 0.14-0.488 0.010zM27.944 4.689c0.166-0.163 0.166-0.427 0-0.589l-0.163-0.16c-0.166-0.161-0.442-0.165-0.608-0.002l-0.988 0.964c-0.134 0.131-0.352 0.124-0.485-0.005l-0.125-0.122c-0.133-0.131-0.138-0.339-0.005-0.467l0.989-0.97c0.51-0.497 1.334-0.502 1.844-0.005l0.161 0.158c0.511 0.499 0.505 1.304-0.004 1.801l-0.987 0.962c-0.134 0.129-0.349 0.129-0.483 0l-0.126-0.124c-0.132-0.129-0.142-0.345-0.010-0.475zM22.67 8.338c-0.168 0.163-0.168 0.428 0 0.591l0.163 0.159c0.166 0.162 0.441 0.166 0.607 0.003l0.988-0.966c0.134-0.129 0.352-0.124 0.486 0.005l0.124 0.124c0.135 0.129 0.138 0.338 0.005 0.467l-0.991 0.967c-0.51 0.499-1.333 0.504-1.844 0.006l-0.163-0.159c-0.509-0.497-0.503-1.302 0.008-1.799l0.985-0.962c0.133-0.13 0.352-0.13 0.484 0l0.125 0.122c0.132 0.129 0.144 0.346 0.011 0.477zM27.168 9.084c0.166 0.163 0.439 0.163 0.605 0l0.163-0.158c0.168-0.165 0.17-0.432 0.003-0.595l-0.989-0.966c-0.134-0.129-0.127-0.341 0.007-0.473l0.125-0.122c0.134-0.129 0.346-0.135 0.479-0.006l0.99 0.968c0.511 0.497 0.516 1.302 0.006 1.8l-0.161 0.157c-0.511 0.499-1.335 0.494-1.844-0.005l-0.986-0.962c-0.134-0.129-0.134-0.341 0-0.472l0.125-0.123c0.133-0.129 0.355-0.14 0.487-0.009z" />
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
