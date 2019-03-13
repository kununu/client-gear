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
    <picture>
      <source
        media="(max-width: 829px)"
        srcSet={`${assetsPath}/${logoMobile}`}
      />
      <source
        media="(min-width: 830px)"
        srcSet={`${assetsPath}/${logoDesktop}`}
      />
      <img
        alt={title}
        aria-hidden="true"
        className={styles.logo}
        rel="presentation"
        src={`${assetsPath}/${logoDesktop}`}
      />
    </picture>
  );

  return link ?
    React.cloneElement(link, link.props, logoContent) :
    logoContent;
};

Logo.propTypes = {
  assetsPath: PropTypes.string,
  link: PropTypes.element,
  logoDesktop: PropTypes.string,
  logoMobile: PropTypes.string,
  title: PropTypes.string,
};

Logo.defaultProps = {
  assetsPath: 'https://assets.kununu.com/images/footer',
  link: null,
  logoDesktop: 'logo-desktop.svg',
  logoMobile: 'logo-mobile.svg',
  title: '',
};

export default Logo;
