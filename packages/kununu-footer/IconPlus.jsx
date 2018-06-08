import React from 'react';
import PropTypes from 'prop-types';

const IconPlus = ({className}) => (
  <svg
    width="29px"
    height="29px"
    className={className}
    viewBox="0 0 29 29"
    version="1.1"
  >
    <title>Plus</title>
    <path
      d="M28.2857143,12.2142857 L28.2857143,16.0714286 C28.2857143,16.6071455 28.0982162,17.0624981 27.7232143,17.4375 C27.3482124,17.8125019 26.8928598,18 26.3571429,18 L18,18 L18,26.3571429 C18,26.8928598 17.8125019,27.3482124 17.4375,27.7232143 C17.0624981,28.0982162 16.6071455,28.2857143 16.0714286,28.2857143 L12.2142857,28.2857143 C11.6785688,28.2857143 11.2232162,28.0982162 10.8482143,27.7232143 C10.4732124,27.3482124 10.2857143,26.8928598 10.2857143,26.3571429 L10.2857143,18 L1.92857143,18 C1.39285446,18 0.937501875,17.8125019 0.5625,17.4375 C0.187498125,17.0624981 0,16.6071455 0,16.0714286 L0,12.2142857 C0,11.6785687 0.187498125,11.2232162 0.5625,10.8482143 C0.937501875,10.4732124 1.39285446,10.2857143 1.92857143,10.2857143 L10.2857143,10.2857143 L10.2857143,1.92857143 C10.2857143,1.39285446 10.4732124,0.937501875 10.8482143,0.5625 C11.2232162,0.187498125 11.6785688,0 12.2142857,0 L16.0714286,0 C16.6071455,0 17.0624981,0.187498125 17.4375,0.5625 C17.8125019,0.937501875 18,1.39285446 18,1.92857143 L18,10.2857143 L26.3571429,10.2857143 C26.8928598,10.2857143 27.3482124,10.4732124 27.7232143,10.8482143 C28.0982162,11.2232162 28.2857143,11.6785687 28.2857143,12.2142857 L28.2857143,12.2142857 Z"
    />
  </svg>
);

IconPlus.propTypes = {
  className: PropTypes.string.isRequired,
};

export default IconPlus;