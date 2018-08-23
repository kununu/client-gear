import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const Logo = ({
  link,
  title,
  assetsPath,
  logoMobile,
  logoDesktop,
}) => {
  const logoContent = (
    <img
      className={styles.logo}
      src={`${assetsPath}/${logoDesktop}`}
      srcSet={`${assetsPath}/${logoMobile} 38w, ${assetsPath}/${logoDesktop} 128w`}
      sizes="(max-width: 830px) 38px, 128px"
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
};

Logo.defaultProps = {
  link: null,
  title: '',
  assetsPath: 'https://assets.kununu.com/images/footer',
  logoDesktop: 'logo-desktop.svg',
  logoMobile: 'logo-mobile.svg',
};

export default Logo;
