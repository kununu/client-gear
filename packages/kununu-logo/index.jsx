import React, {Fragment} from 'react';
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
    <Fragment>
      <img
        className={styles.logoDesktop}
        src={`${assetsPath}/${logoDesktop}`}
        alt={title}
      />
      <img
        rel="presentation"
        aria-hidden="true"
        className={styles.logoMobile}
        src={`${assetsPath}/${logoMobile}`}
        alt={title}
      />
    </Fragment>
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
