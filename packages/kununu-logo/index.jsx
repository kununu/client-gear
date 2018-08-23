import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const Logo = ({
  link,
  title,
  assetsPath,
  logoMobile,
  logoDesktop,
  mobileSize,
  desktopSize,
}) => {
  const logoContent = (
    <img
      className={styles.logo}
      src={`${assetsPath}/${logoDesktop}`}
      srcSet={`${assetsPath}/${logoMobile} ${mobileSize}w, ${assetsPath}/${logoDesktop} ${desktopSize}w`}
      sizes={`(max-width: 830px) ${mobileSize}px, ${desktopSize}px`}
      alt={title}
    />
  );

  return link ?
    React.cloneElement(link, link.props, logoContent)
  : logoContent;
};

Logo.propTypes = {
  link: PropTypes.element,
  title: PropTypes.string,
  assetsPath: PropTypes.string,
  logoDesktop: PropTypes.string,
  logoMobile: PropTypes.string,
  mobileSize: PropTypes.number,
  desktopSize: PropTypes.number,
};

Logo.defaultProps = {
  link: null,
  title: '',
  assetsPath: 'https://assets.kununu.com/images/footer',
  logoDesktop: 'logo-desktop.svg',
  logoMobile: 'logo-mobile.svg',
  mobileSize: 38,
  desktopSize: 138,
};

export default Logo;
