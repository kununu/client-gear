import React from 'react';
import PropTypes from 'prop-types';
import Logo from '@kununu/kununu-logo';

import styles from './index.scss';

export default function Header ({
  children,
  container,
  fixed,
  assetsPath,
  title,
  logoLink,
}) {
  return (
    <header
      role="banner"
      className={`${styles.header} ${fixed && styles.fixed}`}
    >
      <div className={container}>
        <div className={styles.flex}>
          <div className={styles.pullLeft}>
            <Logo
              link={logoLink}
              assetsPath={assetsPath}
              title={title}
            />
            <span className={styles.title}>{title}</span>
          </div>
          <div className={styles.pullRight}>
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  assetsPath: PropTypes.string,
  children: PropTypes.element.isRequired,
  container: PropTypes.string,
  fixed: PropTypes.bool,
  logoLink: PropTypes.element.isRequired,
  title: PropTypes.string,
};

Header.defaultProps = {
  assetsPath: 'https://assets.kununu.com/images/footer',
  container: 'container-fluid',
  fixed: true,
  title: '',
};
